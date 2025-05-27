import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Body from '../components/Body.jsx';
import MessageBlock from '../components/MessageBlock.jsx';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');
  useEffect(() => {
  socket.emit('getMessages');

  const handleHistory = (data) => {
    setMessages(data); 
  };

  socket.on('messageHistory', handleHistory);

  return () => {
    socket.off('messageHistory', handleHistory);
  };
}, [socket]);

  useEffect(() => {
    
    const handleResponse = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on('response', handleResponse);

    return () => {
      socket.off('response', handleResponse);
    };
  }, [socket]);
  useEffect(() => {
    

    socket.on('responseTyping', (data) => setStatus(data));
  

  }, [socket]);

  useEffect(() => {
  const username = localStorage.getItem('user')
  if (username && socket) {
    const userData = {
      user: username,
      socketId: socket.id,
    };
    console.log('Отправка нового пользователя на сервер:', userData);
    socket.emit('newUser', userData);
  }
}, [socket]);

  return (
    <div className="chat-page flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r shadow-md hidden sm:block">
        <Sidebar socket={socket} />
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="p-4 bg-white shadow-md border-b">
          <Body messages={messages} socket={socket} status={status} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <MessageBlock socket={socket} />
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
