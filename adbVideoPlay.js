const { spawn } = require('child_process')


const config = {
  // 滑动切换次数
  scrollTimesNum: 100,
  // 每次停留时常，单位秒
  stayTimeNum: 4,
}

const cmds = 'shell input swipe 500 1400 300 300'
const scrollScreen = () => {
  console.log('>>>>>>>>>>>>> 滑动屏幕')
  spawn('adb', cmds.split(' '))
}



const main = () => {
  setIntervalX(() => {
    scrollScreen()
  }, config.stayTimeNum*1000, config.scrollTimesNum)
}

main()

function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = setInterval(function () {

    callback();

    if (++x === repetitions) {
      clearInterval(intervalID);
    }
  }, delay);
}