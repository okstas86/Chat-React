import React from 'react'

export  const ChatPage=({socket})=> {
  return (
    
    <div className="chat-page">
      <Sidebar />
      <main>
        <Body />
        <MessageBlock/>
      </main>
    </div>
  )
}
