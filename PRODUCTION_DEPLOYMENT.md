# Western Public Academy Website — Production Deployment

This repository contains the complete source code for the Western Public Academy website. It is a production-ready React, TypeScript, Vite, and Tailwind CSS project with all website assets included locally under `client/public/`.

## Production Checks Completed

The project has been validated with the following commands:

```bash
pnpm check
pnpm build
```

The build output is generated in `dist/public/`. For single-page routing on GitHub Pages, the deployment workflow copies `dist/public/index.html` to `dist/public/404.html` and adds `.nojekyll`.

## Local Development

```bash
pnpm install
pnpm dev
```

## Production Build

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

## Vercel Deployment

The project is ready to import into Vercel from `Xhangpeng/wpa`. Vercel should use the settings in `vercel.json`: install with `pnpm install --frozen-lockfile`, build with `pnpm run check && pnpm run build`, and serve `dist/public`.

After connecting the GitHub repository to Vercel, each push to `main` can deploy automatically.

## Package Contents

The source-code ZIP excludes dependency folders such as `node_modules` and repository metadata such as `.git`, but includes the full application source, public images, gallery assets, configuration files, lockfile, production deployment workflow, and the most recent production build output.
