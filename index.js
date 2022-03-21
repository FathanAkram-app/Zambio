const express = require('express')
const path = require('path');
const app = express()
const port = 3001
const bodyParser = require('body-parser')


const http = require('http');
const { initAuthRoutes } = require('./app/routes')
const server = http.createServer(app);
app.use(express.static(__dirname+'/public'));

const { Server } = require("socket.io");
const { initSocketConnection } = require('./app/socket_connections');
const io = new Server(server);


app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));


require('./app/routes')
initAuthRoutes(app)

initSocketConnection(io)

server.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})