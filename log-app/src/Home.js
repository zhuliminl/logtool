import React from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { LazyLog } from 'react-lazylog';

const client = new W3CWebSocket('ws://127.0.0.1:8999');

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: []
    }
  }

  onVideoLog = (logStr = '') => {
    if (logStr.includes('onReadyForDisplay')) {
      console.log('视频开始播放')
      console.log('---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
    }
    if (logStr.includes('logVideoShow')) {
      console.log(logStr)
      console.log('---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
    }
    if (logStr.includes('logVideoPlayError')) {
      console.log(logStr)
      console.log('---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
    }
    // console.log('saul logS  kj', logStr)

  }

  onEzLog = logStr => {

  }

  onGetLog = (logStr, tag) => {
    // console.log(tag, logStr)
    // 打印当前视频的数据
    if (tag === 'video_log') {
      this.onVideoLog(logStr)
    }
    if (tag === 'ez_log') {
      this.onEzLog(logStr)
    }
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const { data = '{}' } = message
      const logData = JSON.parse(data)
      const { logStr = '', tag = '' } = logData
      // console.log('saul', logStr)
      this.onGetLog(logStr, tag)
      // this.setState({
      //   logs: this.state.logs.concat(dataStr)
      // })

      // console.log(message);
    };
  }

  render() {
    const url = 'ws://localhost:8999';
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
      }}>
        <LazyLog
          follow
          selectableLines
          extraLines={1}
          enableSearch
          url={url}
          caseInsensitive
          websocket
          websocketOptions={{
            onOpen: (e, sock) => {
              // socket = sock; sock.send(JSON.stringify({message: "Socket has been opened!"}))
            },
            formatMessage: e => {
              // const dataObj = JSON.parse(e)
              // const logDataStr = dataObj[1]
              // const logDataObj = JSON.parse(logDataStr)
              return e
            }
          }}
        />
      </div>
    )
  }
}