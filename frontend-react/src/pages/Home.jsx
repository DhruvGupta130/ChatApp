import { useNavigate } from "react-router-dom";
import { FaComments, FaPlus, FaSignInAlt } from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 p-5">
            <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg text-center">
                <h1 className="text-5xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
                    <FaComments className="text-blue-500" /> ChatApp
                </h1>
                <p className="text-gray-600 mt-2">Join an existing room or create a new one.</p>

                <div className="mt-6">
                    <button
                        onClick={() => navigate("/join-room")}
                        className="mt-4 w-full bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-lg font-medium"
                    >
                        <FaSignInAlt /> Join Room
                    </button>
                    <button
                        onClick={() => navigate("/create-room")}
                        className="mt-3 w-full bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2 text-lg font-medium"
                    >
                        <FaPlus /> Create Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
