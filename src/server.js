const express = require('express')
var bodyParser = require('body-parser');
const http = require('http')
const WebSocket = require('ws')
const cors = require('cors')

var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.options('*', cors());
app.use(express.static('public'))

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

  //connection is up, let's add a simple simple event
  ws.on('message', (message) => {

    //log the received message and send it back to the client
    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  // setInterval(() => {w
  //   ws.send('fuck');
  // }, 1000);
});

app.post('/printlog', (req, res) => {
  // console.log('saul ............', req.body)

  const { dataStr = '' } = req.body

  wss.clients.forEach((client) => {
    // console.log('saul >>>>>>>>>>>>>>>>>>>>>>>>>>>>>', dataStr)
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(dataStr));
    }
  });
  res.sendStatus(200);
})



server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
