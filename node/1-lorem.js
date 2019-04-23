'use strict';

var http = require('http'); // do not change this line

//Hello world program starts here
var server = http.createServer(function(req, res) {
    //console.log("console logging");
    //console.log(req.url);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<!DOCTYPE html><html><body>lorem ipsum</body></html>');
    res.end();
});

//console.log('sever listening on port 8080');
server.listen(process.env.PORT||8080);
//====================================

//set('port', process.env.PORT||8080);
// any request should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html