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

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const { data = '{}' } = message
      const logData = JSON.parse(data)
      const {logStr = ''} = logData
      console.log('saul', logStr)
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