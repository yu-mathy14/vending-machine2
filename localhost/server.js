const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

  let filePath;

  if (req.url === "/") {
    filePath = path.join(__dirname, "index.html");
  } else {
    filePath = path.join(__dirname, req.url);
  }

  const ext = path.extname(filePath);

  let contentType = "text/plain";

  if (ext === ".html") {
    contentType = "text/html";
  } else if (ext === ".js") {
    contentType = "text/javascript";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType
    });

    res.end(data);
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});