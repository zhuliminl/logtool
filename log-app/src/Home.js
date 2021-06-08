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
      const dataStr = message.data || ''
      // this.setState({
      //   logs: this.state.logs.concat(dataStr)
      // })

      const dataObj = JSON.parse(dataStr)
      const logDataStr = dataObj[1]
      const logDataObj = JSON.parse(logDataStr)

      console.log(dataObj[0], logDataObj)
      // console.log(message);
    };
  }

  render() {
    // const url = 'https://gist.githubusercontent.com/helfi92/96d4444aa0ed46c5f9060a789d316100/raw/ba0d30a9877ea5cc23c7afcd44505dbc2bab1538/typical-live_backing.log';
    // const url = 'http://localhost:3000/csv/log.csv';
    const url = 'ws://localhost:8999';
    return (
      <div style={{
        // height: 500, width: 902
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
              const dataObj = JSON.parse(e)
              const logDataStr = dataObj[1]
              const logDataObj = JSON.parse(logDataStr)

              return e
            }
          }}
        />
      </div>

    )

    // return (
    //   <div>
    //     {
    //       this.state.logs.map((item, i) => {
    //         return (
    //           <div key={i}>
    //             {item}
    //           </div>
    //         )
    //       })
    //     }
    //   </div>
    //   // <LazyLog url="http://localhost:3000/csv/log.csv" />
    // )
  }
}