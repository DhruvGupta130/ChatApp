import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ChatRoom from "./components/ChatRoom";
import { ChatProvider } from "./context/ChatContext";
import JoinRoom from "./components/JoinRoom.jsx";
import CreateRoom from "./components/CreateRoom.jsx";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <ChatProvider>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/join-room" element={<JoinRoom />} />
                    <Route path="/create-room" element={<CreateRoom />} />
                    <Route path="/room/:roomName/:userName" element={<ChatRoom />} />
                </Routes>
            </Router>
        </ChatProvider>
    );
}

export default App;