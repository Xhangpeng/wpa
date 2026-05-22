import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const base = 'http://127.0.0.1:4173';
const routes = ['/', '/about', '/programs', '/gallery', '/contact', '/academics/notices', '/apply'];
const assetCheckRoutes = new Set();
const viewports = [
  { name: 'mobile_360', width: 360, height: 740, mobile: true, dpr: 2 },
  { name: 'tablet_768', width: 768, height: 1024, mobile: true, dpr: 2 },
  { name: 'laptop_1366', width: 1366, height: 900, mobile: false, dpr: 1 },
  { name: 'desktop_1920', width: 1920, height: 1080, mobile: false, dpr: 1 },
];

const outDir = '/home/ubuntu/western-public-academy-work/responsive-test-output';
mkdirSync(outDir, { recursive: true });

function sanitizeRoute(route) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
}

let msgId = 0;
function send(ws, method, params = {}) {
  const id = ++msgId;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Timeout waiting for ${method}`)), 15000);
    const handler = (event) => {
      const data = JSON.parse(event.data.toString());
      if (data.id === id) {
        clearTimeout(timeout);
        ws.removeEventListener('message', handler);
        if (data.error) reject(new Error(`${method}: ${JSON.stringify(data.error)}`));
        else resolve(data.result || {});
      }
    };
    ws.addEventListener('message', handler);
  });
}

async function waitForLoad(ws) {
  await new Promise((resolve) => {
    const timer = setTimeout(resolve, 8000);
    const handler = (event) => {
      const data = JSON.parse(event.data.toString());
      if (data.method === 'Page.loadEventFired') {
        clearTimeout(timer);
        ws.removeEventListener('message', handler);
        resolve();
      }
    };
    ws.addEventListener('message', handler);
  });
  await sleep(1400);
  await send(ws, 'Runtime.evaluate', { expression: 'document.fonts && document.fonts.ready', awaitPromise: true }).catch(() => {});
}

async function openTab(port, url) {
  const res = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  if (!res.ok) throw new Error(`Cannot create tab: ${res.status}`);
  return res.json();
}

async function main() {
  const port = 9333 + Math.floor(Math.random() * 500);
  const userDataDir = `/tmp/wpa-chromium-${Date.now()}`;
  rmSync(userDataDir, { recursive: true, force: true });
  const chrome = spawn('/usr/bin/chromium', [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
    `--remote-debugging-port=${port}`, `--user-data-dir=${userDataDir}`, 'about:blank'
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  try {
    for (let i = 0; i < 60; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (res.ok) break;
      } catch {}
      await sleep(250);
      if (i === 59) throw new Error('Chromium DevTools endpoint did not start');
    }

    const rows = [];
    for (const viewport of viewports) {
      for (const route of routes) {
        const url = `${base}${route}`;
        const tab = await openTab(port, url);
        const ws = new WebSocket(tab.webSocketDebuggerUrl);
        await new Promise((resolve, reject) => {
          ws.addEventListener('open', resolve, { once: true });
          ws.addEventListener('error', reject, { once: true });
        });
        await send(ws, 'Page.enable');
        await send(ws, 'Runtime.enable');
        await send(ws, 'Emulation.setDeviceMetricsOverride', {
          width: viewport.width,
          height: viewport.height,
          deviceScaleFactor: viewport.dpr,
          mobile: viewport.mobile,
        });
        await send(ws, 'Page.navigate', { url });
        await waitForLoad(ws);
        const evalResult = await send(ws, 'Runtime.evaluate', {
          expression: `(() => {
            const doc = document.documentElement;
            const body = document.body;
            const imageSources = [...document.images].map(img => img.currentSrc || img.src).filter(Boolean);
            const brokenImages = [...document.images]
              .filter(img => img.complete && img.naturalWidth === 0)
              .map(img => img.currentSrc || img.src);
            const horizontalOverflow = Math.max(doc.scrollWidth, body.scrollWidth) - window.innerWidth;
            const visibleText = (body.innerText || '').trim().slice(0, 120);
            return {
              route: location.pathname,
              title: document.title,
              innerWidth: window.innerWidth,
              scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
              scrollHeight: Math.max(doc.scrollHeight, body.scrollHeight),
              horizontalOverflow,
              brokenImageCount: brokenImages.length,
              brokenImages: brokenImages.slice(0, 5),
              imageSources,
              visibleText,
            };
          })()`,
          returnByValue: true,
        });
        const metrics = evalResult.result?.value || {};
        const screenshot = await send(ws, 'Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
        const shotPath = `${outDir}/${viewport.name}_${sanitizeRoute(route)}.png`;
        writeFileSync(shotPath, Buffer.from(screenshot.data, 'base64'));
        rows.push({ viewport: viewport.name, width: viewport.width, height: viewport.height, route, screenshot: shotPath, ...metrics });
        for (const src of metrics.imageSources || []) assetCheckRoutes.add(src);
        ws.close();
      }
    }

    const assetFailures = [];
    for (const src of assetCheckRoutes) {
      try {
        const res = await fetch(src, { method: 'GET' });
        if (!res.ok) assetFailures.push({ src, status: res.status });
      } catch (error) {
        assetFailures.push({ src, status: String(error) });
      }
    }
    writeFileSync(`${outDir}/responsive-results.json`, JSON.stringify({ rows, assetFailures }, null, 2));
    const failures = rows.filter(r => (r.horizontalOverflow || 0) > 2 || (r.brokenImageCount || 0) > 0 || !r.visibleText).concat(assetFailures.map(f => ({ route: 'asset', ...f })));
    const md = [
      '# Responsive Test Results',
      '',
      `Tested ${routes.length} routes across ${viewports.length} device sizes on ${new Date().toISOString()}. Asset URLs checked: ${assetCheckRoutes.size}.`,
      '',
      '| Viewport | Route | Width | Overflow px | Broken Images | Screenshot |',
      '|---|---:|---:|---:|---:|---|',
      ...rows.map(r => `| ${r.viewport} | ${r.route} | ${r.innerWidth} | ${Math.round(r.horizontalOverflow || 0)} | ${r.brokenImageCount || 0} | ${r.screenshot.split('/').pop()} |`),
      '',
      failures.length ? `**Failures:** ${failures.length}` : '**Failures:** 0',
    ].join('\n');
    writeFileSync(`${outDir}/responsive-results.md`, md + '\n');
    if (failures.length) {
      console.error(JSON.stringify(failures, null, 2));
      process.exitCode = 1;
    } else {
      console.log(`Responsive tests passed. Results written to ${outDir}`);
    }
  } finally {
    chrome.kill('SIGTERM');
    rmSync(userDataDir, { recursive: true, force: true });
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
