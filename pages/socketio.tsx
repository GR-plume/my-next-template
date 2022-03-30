import { useState, useEffect } from "react"
import { io } from "socket.io-client"

const Socketio = () => {
  const [connected, setConnected] = useState(false)
  const [socketid, setSocketid] = useState('')

  useEffect((): any => {
    // connect to socket server
    const socket = io()

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id)
      setConnected(true)
      setSocketid(socket.id)
    })

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect()
  }, [])

  return (
    <>
      {connected && (
        <div>{ socketid }</div>
      )}
    </>
  )
}

export default Socketio