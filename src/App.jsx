import { useState } from 'react'

import Dashboard from './Dashboard';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BrowserRouter,  } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import Room from './Room';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    // Inject CSS to style all MUI TextField components
    const style = document.createElement('style');
    style.innerHTML = `
      /* Change default border color for Outlined TextFields */
      .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
        border-color: #3f6212; /* Default border color */
      }
              .css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked {
    color: var(--color1) !important;
}
      .css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track {
    background-color: var(--color1);
}
  
       '& .MuiOutlinedInput-root': {
       '&:hover fieldset': {
         borderColor: 'var(--color1)', 
         },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--color1)', 
          },
           },
                                                        
      /* Change border color on hover for Outlined TextFields */
      .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
        border-color: #3f6212; /* Hover border color */
      }

      /* Change border color when focused for Outlined TextFields */
      .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #3f6212; /* Focused border color */
      }

       .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #3f6212;
    border-width: 2px;
  }
      /* Change label colors */
      .MuiInputLabel-root {
        color: #3f6212; /* Default label color */
      }
      
      .MuiInputLabel-root.Mui-focused {
        color: #3f6212; /* Focused label color */
      }

      /* Change underline color for Standard TextFields */
      .MuiInput-underline:before {
        border-bottom: 2px solid #3f6212; /* Default underline color */
      }

      .MuiInput-underline:hover:not(.Mui-disabled):before {
        border-bottom: 2px solid #3f6212; /* Hover underline color */
      }

       .css-1z6833-MuiButtonBase-root-MuiButton-root:hover{
      background-color: #3f6212;
      }

      .MuiInput-underline:after {
        border-bottom: 2px solid #3f6212; /* Focused underline color */
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to remove the styles on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");
  const [CreateRoomCode, setCreateRoomCode] = useState("");



  const createRoom = () => {
    const newRoom = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCreateRoomCode(newRoom);

  };

  return (
    <>
     <div className="App">
  


        <Router>
          <Switch>

            <Route path='/dashboard'>
              <Dashboard />

            </Route>
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
              <div className="flex flex-col items-center text-center">
                <h2 className="text-4xl font-bold mb-6">Connect with Anyone, Anytime</h2>
                <p className="text-lg text-gray-400 mb-6">
                  Start or join a video call instantly with a unique room code.
                </p>

                <div className="flex space-x-4">
                  {/* Create Room Button */}
                  <button
                    onClick={createRoom}
                    className="px-6 py-3 bg-blue-500 rounded-lg text-white font-semibold text-lg shadow-md hover:bg-blue-600"
                  >
                    Create Room
                  </button>

                  {/* Join Room Input & Button */}
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter Room Code"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value)}
                      className="p-3  rounded-l-lg text-black outline-none"
                    />
                    <button
                      onClick={() => history.push(`/room/${roomCode}`, { roomCode })}
                      className="px-6 py-3 bg-green-500 rounded-r-lg text-white font-semibold text-lg shadow-md hover:bg-green-600"
                    >
                      Join
                    </button>

                  </div>

                </div>
                <p className="text-lg text-gray-400 mb-6 mt-5">
                  {CreateRoomCode}
                </p>
              </div>

              {/* Footer */}
              <div className="absolute bottom-4 text-gray-400 text-sm">
                Built with ❤️ using React & Node
              </div>
            </div>         <Route path='/room/:id'>
              <Room />

            </Route>

            {/* <Route path='/mehul'>
            <AddPurchaseReturn />
          </Route> */}
          </Switch>
        </Router>
    </div>
    
    </>
  )
}

export default App
