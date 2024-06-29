import React, { useEffect, useState } from 'react'

import './Chat.css'

function Chat() {
  let [ messages, setMessages ] = useState<string[]>([])
  useEffect(() => {
    // setupListener()
  }, [messages])
  return (
    <div id='chat'>
      <h1>Chat test</h1>
      <div id='history'>
      {messages.map((message, index) => <p key={index}>{message}</p>)}
        <input type='text' id='message' />
        <button onClick={() => { sendMessage(setMessages) }}>Send</button>
      </div>
    </div>
  )
}

function setupListener() {
  throw new Error('Function not implemented.');
}

function sendMessage(setMessages: React.Dispatch<React.SetStateAction<string[]>>) {
  const message = document.getElementById('message') as HTMLInputElement
  setMessages(prev => [...prev, message.value])
}

export default Chat;