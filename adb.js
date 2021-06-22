const WebSocket = require('ws')
const { spawn } = require('child_process')

// 配置和限制 log 的范围

const adbFlow = (wss) => {
  const proc = spawn('adb', ['logcat', '-s', 'EzvizLog:V'])
  proc.stdout.on("data", data => {
    const s = data.toString()

    wss.clients.forEach((client) => {
      const dataStr = { logStr: s }
      // console.log('saul >>>>>>>>>>>>>>>>>>>>>>>>>>>>>', dataStr)
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(dataStr));
      }
    });

    console.log('saul bbbbbb', s)
    // console.log(`stdout: ${data}`);
  });

  proc.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });

  proc.on('error', (error) => {
    console.log(`error: ${error.message}`);
  });

  proc.on("close", code => {
    console.log(`child process exited with code ${code}`);
  })

}


module.exports = adbFlow
