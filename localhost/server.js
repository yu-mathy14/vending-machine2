const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function(req, res){
  const filePath = path.join(__dirname, 'index.html');

  fs.readFile(filePath, 'utf-8', function(err, data) {
    if (err) {
      res.writeHead(500,{
        'Content-Type': 'text/plain'
      });
      res.end('Server Error');
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(data);
  });
});

server.listen(3000, '0.0.0.0', function(){
  console.log('Server running on port 3000');
});