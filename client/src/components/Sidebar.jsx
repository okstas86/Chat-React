import React from 'react'

const Sidebar = () => {
  return (
    <div className="sidebar h-full p-4 bg-white border-r shadow-md">
      <h4 className="text-xl font-semibold mb-4 text-gray-800">Пользователи</h4>
      <ul className="space-y-2">
        <li className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-amber-100 cursor-pointer transition">
          User1
        </li>
        <li className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-amber-100 cursor-pointer transition">
          User2
        </li>
      </ul>
    </div>
  );
};

export default Sidebar