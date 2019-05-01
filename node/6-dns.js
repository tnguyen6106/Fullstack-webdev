'use strict';

var http = require('http'); // do not change this line
var dns = require('dns'); // do not change this line
const toCopyAddresses = [];
var errorMessage;
const server = http.createServer(function(req, res) {
    dns.resolve4(req.url.substring(1), function(err, addresses) {
       if(err){
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.write('error');
            res.end();
       } 
       else {
            console.log(addresses);
            
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.write(addresses.join('\n'));
            res.end();
       }
    });
});

console.log('server listerning on port 8080');
server.listen(process.env.PORT || 8080)
// http://localhost:8080/pdx.edu should return '131.252.115.150' in plain text (address might be different, there could even be multiple addresses)

// http://localhost:8080/sniklaus.com should return '216.239.36.21\n216.239.38.21\n216.239.32.21\n216.239.34.21' in plain text (addresses / order might be different)

// http://localhost:8080/error should return 'error' in plain text