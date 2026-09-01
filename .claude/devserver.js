/* Local dev server for previewing the site. Not part of the deployed site.
   GitHub Pages serves the repo root directly and never runs this. */

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PORT = 4173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
    const full = path.resolve(ROOT, rel);

    if (!full.startsWith(ROOT)) {
      res.writeHead(403).end("forbidden");
      return;
    }

    fs.readFile(full, (err, buf) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/plain" }).end("404 " + rel);
        return;
      }
      res.writeHead(200, {
        "content-type": TYPES[path.extname(full).toLowerCase()] || "application/octet-stream",
        "cache-control": "no-store",
      });
      res.end(buf);
    });
  })
  .listen(PORT, () => console.log("serving " + ROOT + " on http://localhost:" + PORT));
