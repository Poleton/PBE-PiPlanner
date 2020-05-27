//Set the port and the host of the server
const hostname = '192.168.1.47';
const port = 4000;

const server = require('./controller.js');


//Server starts listening
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});