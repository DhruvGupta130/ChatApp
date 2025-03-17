import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../services/api";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const CreateRoomPage = () => {
    const [roomName, setRoomName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        setLoading(true);
        try {
            await createRoom(roomName);
            toast.success(`Room "${roomName}" created successfully!`);
            navigate(`/room-success/${roomName}`);
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
                <p className="text-gray-600 mt-2">Start a new chat room</p>

                <div className="mt-5">
                    <input
                        type="text"
                        placeholder="Room Name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        disabled={loading}
                    />

                    <button
                        onClick={handleCreateRoom}
                        className={`mt-5 w-full px-5 py-3 rounded-lg text-white text-lg font-medium flex items-center justify-center gap-2 ${
                            roomName.trim()
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!roomName.trim() || loading}
                    >
                        {loading ? "Creating..." : <><FaPlus /> Create Room</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoomPage;
