/* Or use this example tcp client written in node.js.  
(Originated with example code from 
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

const { networkInterfaces } = require('os');
var net = require('net');
var os = require("os");
const PORT = 1348;

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

var dockerHostIpAddresses = [];
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
				var blocks = net.address.split(".");
				if (blocks.indexOf('172') !== -1) {
					console.log('Container IP: ', net.address);
					blocks[3] = '1';
					var new_ip = blocks.join('.');
					dockerHostIpAddresses.push(new_ip);
				}
        }
    }
}

//console.log(dockerHostIpAddresses);

var hostname = os.hostname();

var client = new net.Socket();
console.log('Server IP: ', dockerHostIpAddresses[0]);
client.connect(PORT, dockerHostIpAddresses[0], function() {
	console.log('Connected');
	client.write(hostname);
});

client.on('data', (data) => {
	console.log('Received: ' + data);
	//client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
