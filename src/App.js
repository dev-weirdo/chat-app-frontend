// import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import pcLogo from '../src/assets/prime-logo.png'

const socket = io.connect("https://prime-candidates-chat-app.herokuapp.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-cyan-200 to-blue-200">
      {!showChat ? (
        <div className="w-11/12 md:w-7/12 lg:w-[450px] border-2 p-5 rounded-lg grid gap-6">
          <div>
            <img className="mx-auto" height={190} width={190} src={pcLogo} alt="prime candidates logo"></img>
          </div>
          <div className="grid gap-6">
            <div className="form-control">
              <label className="input-group input-group-vertical">
                <span>Username</span>
                <input type="text" placeholder="John..." onChange={(event) => { setUsername(event.target.value); }} className="input input-bordered text-lg" />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group input-group-vertical">
                <span>Room ID</span>
                <input type="text" placeholder="123" onChange={(event) => { setRoom(event.target.value); }} className="input input-bordered text-lg" />
              </label>
            </div>
            <button onClick={joinRoom} class="btn btn-md w-3/5 md:2/5 mx-auto">Join</button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
