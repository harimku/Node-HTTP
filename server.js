//importing http module
const http = require('http');  

//declare constants
const hostname = 'localhost';
const port = 3000;

//use 'path' and 'fs' core node modules to serve more files
const path = require('path');
const fs = require('fs');

//setting up the server
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {  //if it's a get request
        let fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }

        const filePath = path.resolve('./public' + fileUrl);  //get absolute file path and save to 'filePath'
        const fileExt = path.extname(filePath);

        if (fileExt === '.html') {  // if file format is html
            // check if file is accessible/exists
            fs.access(filePath, err => { 
                if (err) {
                    res.statusCode = 404;  //404 = "not found"
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                // if no error
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                fs.createReadStream(filePath).pipe(res);  // reading file contents in a small chunk at a time
            });
        } else {  // if file format is not html
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {  // for anything other than get request
        res.statusCode = 404;  //404 = "not found"
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});