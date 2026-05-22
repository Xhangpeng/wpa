import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const routes = ['/', '/about', '/contact', '/apply'];
const base = 'http://127.0.0.1:4173';
let id = 0;
function send(ws, method, params = {}) {
  const mid = ++id;
  ws.send(JSON.stringify({ id: mid, method, params }));
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(method + ' timeout')), 12000);
    const h = e => {
      const d = JSON.parse(e.data.toString());
      if (d.id === mid) { clearTimeout(t); ws.removeEventListener('message', h); d.error ? reject(new Error(JSON.stringify(d.error))) : resolve(d.result || {}); }
    };
    ws.addEventListener('message', h);
  });
}
async function openTab(port, url) {
  const r = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  return r.json();
}
async function main() {
  const port = 9666;
  const chrome = spawn('/usr/bin/chromium', ['--headless=new','--no-sandbox','--disable-gpu',`--remote-debugging-port=${port}`,`--user-data-dir=/tmp/wpa-overflow-${Date.now()}`,'about:blank'], {stdio:'ignore'});
  for (let i=0;i<40;i++){ try { if((await fetch(`http://127.0.0.1:${port}/json/version`)).ok) break; } catch{} await sleep(250); }
  for (const route of routes) {
    const tab = await openTab(port, base + route);
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((res,rej)=>{ws.addEventListener('open',res,{once:true}); ws.addEventListener('error',rej,{once:true});});
    await send(ws,'Page.enable'); await send(ws,'Runtime.enable');
    await send(ws,'Emulation.setDeviceMetricsOverride',{width:360,height:740,deviceScaleFactor:2,mobile:true});
    await send(ws,'Page.navigate',{url:base+route});
    await sleep(2500);
    const r = await send(ws,'Runtime.evaluate',{returnByValue:true,expression:`(() => {
      const vw = window.innerWidth;
      return [...document.body.querySelectorAll('*')].map((el, i) => {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        const overRight = rect.right - vw;
        const overLeft = -rect.left;
        if (overRight > 1 || overLeft > 1) return {
          i,
          tag: el.tagName.toLowerCase(),
          cls: el.className && String(el.className).slice(0,120),
          text: (el.innerText || el.alt || '').trim().replace(/\s+/g,' ').slice(0,80),
          left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width),
          overRight: Math.round(overRight), overLeft: Math.round(overLeft),
          display: style.display, position: style.position, transform: style.transform,
        };
      }).filter(Boolean).sort((a,b)=>(b.overRight+b.overLeft)-(a.overRight+a.overLeft)).slice(0,30);
    })()`});
    console.log('\nROUTE', route, JSON.stringify(r.result.value, null, 2));
    ws.close();
  }
  chrome.kill('SIGTERM');
}
main().catch(e=>{console.error(e); process.exit(1);});
