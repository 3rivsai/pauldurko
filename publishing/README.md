# Publishing Site

This is the upload-ready source folder for the publishing landing page.

## Requirements

- Node.js `>=22.13.0`
- npm

## Local Development

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:3000`.

## Build

```bash
npm run build
```

The production build is generated into `dist/`.

## Uploading To Git

Upload this folder as the root of the repository for the publishing site. Do not
commit `node_modules`, `dist`, `.next`, `.vinext`, `.wrangler`, or local `.env`
files.

If you are mounting the site at `pauldurko.com/publishing`, configure that path
in your hosting provider as a rewrite/proxy to this app. If your provider expects
a standalone app at the root, connect this repository normally and set the custom
route there.
