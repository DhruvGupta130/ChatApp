import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connectWebSocket, disconnectWebSocket, sendMessage } from "../services/socket";
import { getMessages, deleteRoom } from "../services/api"; // Import deleteRoom function
import { ChatContext } from "../context/ChatContext";
import { FaPaperPlane, FaArrowLeft, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ChatRoom = () => {
    const { roomName, userName } = useParams();
    const { messages, setMessages } = useContext(ChatContext);
    const [message, setMessage] = useState("");
    const [isPressed, setIsPressed] = useState(false);
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    const password = sessionStorage.getItem("room");

    useEffect(() => {
        getMessages(roomName).then((res) => {
            setMessages(res.data);
        });

        connectWebSocket(roomName, (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });
    }, [roomName, setMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        setIsPressed(true);
        sendMessage(roomName, userName, message);
        setMessage("");

        setTimeout(() => setIsPressed(false), 150);
    };

    const handleDisconnect = () => {
        disconnectWebSocket(roomName)
            .then(() => toast.success("Successfully disconnected!"))
            .catch((err) => toast.error(err));
        navigate("/");
    };

    const handleDeleteRoom = async () => {
        if (!window.confirm("Are you sure you want to delete this chat room? This action is irreversible!")) return;

        try {
            await deleteRoom(roomName, password); // Call delete room API
            toast.success(`Room "${roomName}" deleted successfully.`);
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete the room. Please try again.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 p-6">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={handleDisconnect}
                        className="text-gray-600 hover:text-gray-900 transition-all flex items-center gap-2"
                    >
                        <FaArrowLeft /> Back
                    </button>
                    <button
                        onClick={handleDeleteRoom}
                        className="text-red-600 hover:text-red-900 transition-all flex items-center gap-2"
                    >
                        <FaTrash /> Delete Room
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 text-center flex-grow">
                    Chat Room: {roomName}
                </h2>

                {/* Chat Messages */}
                <div className="mt-4 h-[60vh] overflow-y-auto border rounded-lg p-4 bg-gray-100 flex flex-col">
                    {messages.length === 0 ? (
                        <p className="text-center text-gray-500">No messages yet...</p>
                    ) : (
                        messages.map((msg, index) => {
                                const messageTime = new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                                return (
                                    <div key={index} className={`flex mb-3 ${msg.sender === userName ? "justify-end" : "justify-start"}`}>
                                        <div
                                            className={`relative p-3 min-w-30 rounded-2xl shadow-lg ${
                                                msg.sender === userName
                                                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                                                    : "bg-gray-300 text-gray-900"
                                            }`}
                                        >
                                            <strong className="block text-xs">{msg.sender}</strong>
                                            <p className="text-base mb-3">{msg.content}</p>
                                            <span className={`absolute bottom-1 right-2 text-xs ${msg.sender === userName? `text-gray-300` : "text-gray-600"}`}>{messageTime}</span>
                                        </div>
                                    </div>
                                );
                            })
                    )}
                    <div ref={messagesEndRef}></div>
                </div>

                {/* Message Input */}
                <div className="mt-4 flex items-center gap-3">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleSendMessage}
                        className={`p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center gap-2 transform ${isPressed ? "scale-90" : "scale-100"}`}
                    >
                        <FaPaperPlane /> Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;