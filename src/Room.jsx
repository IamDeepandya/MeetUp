import { useState } from "react";

import { useLocation  } from "react-router-dom/cjs/react-router-dom.min";

export default function Room() {
  const location = useLocation();
  const { roomCode } = location.state || {}; 

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Navbar */}
      <div className="absolute top-0 w-full flex justify-between items-center p-4 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-white">Video Chat</h1>
        <div>
        <button
          className="px-4  m-2 py-2 bg-red-500 rounded-lg font-semibold hover:bg-red-600"
          onClick={() => alert("signup  !")}
        >
          Signup
        </button>
        <button
          className="px-4 m-2 py-2 bg-red-500 rounded-lg font-semibold hover:bg-red-600"
          onClick={() => alert("login !")}
        >
          Login
        </button>
        </div>
        
      </div>

      {/* Main Content */}
      <p className="text-lg text-gray-400 mb-6 mt-5">
         {roomCode}
        </p>

      {/* Footer */}
      <div className="absolute bottom-4 text-gray-400 text-sm">
        Built with ❤️ using React & Node
      </div>
    </div>
  );
}
