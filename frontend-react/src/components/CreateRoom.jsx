import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../services/api";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const CreateRoomPage = () => {
    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        if (!roomName.trim() || !password.trim()) {
            toast.warn("Room name and password cannot be empty!");
            return;
        }
        if(password.trim().length < 6) {
            toast.warn("Password must be at least 6 characters!");
        }
        if(password !== confirmPassword) {
            toast.warn("Confirm password must match with password!");
        }

        setLoading(true);
        try {
            await createRoom({ roomName, password });
            toast.success(`Room "${roomName}" created successfully!`);
            navigate(`/room/${roomName}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error in creating room!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 p-5">
            <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
                    <FaPlus className="text-green-600" /> Create Room
                </h2>
                <p className="text-gray-600 mt-2">Start a new chat room with a password.</p>

                <div className="mt-5">
                    <input
                        type="text"
                        placeholder="Room Name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        disabled={loading}
                    />

                    <div className="relative mt-3">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={loading}
                        />
                    </div>

                    <div className="relative mt-3">
                        <input
                            type="password"
                            placeholder="Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={loading}
                        />
                    </div>

                    <button
                        onClick={handleCreateRoom}
                        className={`mt-5 w-full px-5 py-3 rounded-lg text-white text-lg font-medium flex items-center justify-center gap-2 ${
                            roomName.trim() && password.trim()
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!roomName.trim() || !password.trim() || loading}
                    >
                        {loading ? "Creating..." : <><FaPlus /> Create Room</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoomPage;
