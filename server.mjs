import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./public/", import.meta.url));
const types = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".mjs":"text/javascript; charset=utf-8", ".svg":"image/svg+xml" };

export function createApp() {
  return createServer(async (req, res) => {
    try {
      if (req.url === "/favicon.ico") { res.writeHead(204); return res.end(); }
      const requested = req.url === "/" ? "index.html" : req.url.slice(1).split("?")[0];
      const safe = normalize(requested).replace(/^(\.\.[/\\])+/, "");
      const type = types[extname(safe)];
      if (!type) throw Object.assign(new Error("Not found"), { code:"ENOENT" });
      const file = await readFile(join(root, safe));
      res.writeHead(200, { "content-type":type, "cache-control":"no-cache", "x-content-type-options":"nosniff", "content-security-policy":"default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'" });
      res.end(file);
    } catch (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500, { "content-type":"text/plain; charset=utf-8" });
      res.end(error.code === "ENOENT" ? "Not found" : "Server error");
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4174);
  createApp().listen(port, () => console.log(`ReplyPilot Demo running at http://localhost:${port}`));
}
