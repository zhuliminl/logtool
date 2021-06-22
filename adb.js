const { exec } = require("child_process");


const send = () => {
  const shell_1 = 'adb logcat'
  exec(shell_1, (error, stdout, stderr) => {
    console.log('saul .........', stdout)

    if (error) {
      console.log(`error: ${error.message}`)
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
      return;
    }
    console.log(`stdout: ${stdout}`)
  })
}
















send()