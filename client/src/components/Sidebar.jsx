import React,{useEffect, useState} from 'react'


const Sidebar = ({ socket }) => {
 
  const [users, setUsers] = useState([])

useEffect(() => {
  const handleUsers = (users) => {
    console.log('Пользователи получены:', users);
    setUsers(users);
  };

  socket.on('getUsers', handleUsers);

  return () => {
    socket.off('getUsers', handleUsers); 
  };
}, [socket]);
  
  
  return (
    <div className="sidebar h-full p-4 bg-white border-r shadow-md">
      <h4 className="text-xl font-semibold mb-4 text-gray-800">Пользователи</h4>
      <ul className="space-y-2">
       {users.map((el) =>
         el.user ? (
           
            <li key={el.socketId} className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-amber-100 cursor-pointer transition">
              {el.user} {el.socketId}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default Sidebar