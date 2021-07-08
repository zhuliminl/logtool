const WebSocket = require('ws')
const { spawn } = require('child_process')
const log4js = require("log4js");

log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "trace" } }
});

const logger = log4js.getLogger("cheese")

// 配置和限制 log 的范围

const adbFlow = (wss, tag = 'ez_log') => {
  let proc = spawn('adb', ['logcat', '-s', 'EzvizLog:V', '-v', 'raw'])
  if (tag === 'ez_log') {
    proc = spawn('adb', ['logcat', '-s', 'EzvizLog:V', '-v', 'raw'])
  }
  if (tag === 'video_log') {
    proc = spawn('adb', ['logcat', '*:S', 'ReactNative:V', 'ReactNativeJS:V', '-v', 'raw'])
  }


  proc.stdout.on("data", data => {
    const s = data.toString()

    wss.clients.forEach((client) => {
      const dataStr = { logStr: s, tag }
      // console.log('saul >>>>>>>>>>>>>>>>>>>>>>>>>>>>>', dataStr)
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(dataStr));
      }
    });

    saveToLog(s)


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

function saveToLog(s = '') {
  console.log('saul 日志～～～～～～～～～', s)
  if (s.includes('logVideoPlayError')) {
    logger.error(s);
  }
  if (s.includes('logVideoShow')) {
    logger.error(s);
  }
  logger.trace(s)

}


module.exports = adbFlow
