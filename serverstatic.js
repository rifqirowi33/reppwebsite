const http = require("http");
const port = process.env.PORT || 8585;
const url = require("url");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
  let pathname = decodeURI(parsedURL.pathname); // Menguraikan URL dan mengganti karakter spasi
  pathname = pathname.replace(/^\/+|\/+$/g, "");

  if (pathname === "") {
    pathname = "index.html";
  }

  const filePath = path.join(__dirname, pathname);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.log(`File Not Found: ${filePath}`);
      res.writeHead(404);
      res.end();
    } else {
      const mimeType = getMimeType(pathname);

      res.setHeader("X-Content-Type-Options", "nosniff");
      res.writeHead(200, { "Content-Type": mimeType });

      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    }
  });
});

server.listen(port, () => {
  console.log("Listening on port 8585");
});

function getMimeType(filename) {
  const extname = path.extname(filename).toLowerCase();

  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".txt": // Menambahkan definisi mime type untuk .txt
      return "text/plain";
    default:
      return "application/octet-stream";
  }
}
