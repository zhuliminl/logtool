const express = require('express')
var bodyParser = require('body-parser');
const http = require('http')
const WebSocket = require('ws')
const cors = require('cors')
const adbFlow = require('../adbFlow')
var bodyParser = require('body-parser');
const process = require('process')

const { argv = [] } = process
const tag = argv[2] || 'ez_log'

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.options('*', cors());
app.use(express.static('public'))

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

console.log('saul 服务启动了', tag)


wss.on('connection', (ws) => {

  ws.on('message', (message) => {

    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
  });

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

adbFlow(wss, tag)


server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
