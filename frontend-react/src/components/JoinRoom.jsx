import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { joinRoom } from "../services/api.js";

const JoinRoomPage = () => {
    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const navigate = useNavigate();
    const defaultName = "user" + Math.floor(Math.random() * 100000);

    const handleJoinRoom = async () => {
        if (!roomName.trim() || !password.trim()) {
            toast.warn("Please enter room name and password!");
            return;
        }
        try {
            setLoading(true);
            await joinRoom(roomName, password);
            toast.success(`Joined room "${roomName}" successfully!`);
            navigate(`/room/${roomName}/${isAnonymous ? defaultName : name || defaultName}`);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Error while joining room!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 p-5">
            <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
                    <FaSignInAlt className="text-blue-600" /> Join Room
                </h2>
                <p className="text-gray-600 mt-2">Enter the room details to join.</p>

                <div className="mt-5">
                    <input
                        type="text"
                        placeholder="Room Name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        disabled={loading}
                    />

                    <input
                        type="text"
                        placeholder="Your Name"
                        value={isAnonymous ? defaultName: name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-3 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300"
                        disabled={loading || isAnonymous}
                    />

                    {/* Checkbox to toggle anonymous mode */}
                    <div className="mt-3 flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="anonymous"
                            checked={isAnonymous}
                            onChange={() => setIsAnonymous(!isAnonymous)}
                            className="h-5 w-5 text-blue-600"
                        />
                        <label htmlFor="anonymous" className="text-gray-700 cursor-pointer">
                            Join Anonymously
                        </label>
                    </div>

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-3 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        disabled={loading}
                    />

                    <button
                        onClick={handleJoinRoom}
                        className={`mt-5 w-full px-5 py-3 rounded-lg text-white text-lg font-medium flex items-center justify-center gap-2 ${
                            roomName.trim() && password.trim()
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!roomName.trim() || !password.trim() || loading}
                    >
                        {loading ? "Joining..." : <><FaSignInAlt /> Join Room</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinRoomPage;