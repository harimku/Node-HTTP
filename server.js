//importing http module
const http = require('http');  

//declare constants
const hostname = 'localhost';
const port = 3000;

//setting up the server
const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;  // 200 = everything is okay
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello, World!</h1></body></html>');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});