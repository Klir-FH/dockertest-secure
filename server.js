const http = require("http");

const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "v1";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok", version: VERSION }));
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`Hello from newer and better container (${VERSION})\n`);
});

server.listen(PORT, () => {
  console.log(`[startup] server listening on port ${PORT}, version=${VERSION}`);
});
