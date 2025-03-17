import { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { FaCheckCircle, FaCopy, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const RoomSuccess = () => {
    const { roomName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Room Created - ${roomName}`;
    }, [roomName]);

    const roomLink = `${window.location.origin}/join-room`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(roomLink);
        alert("Room link copied to clipboard!");
    };

    const shareViaWhatsApp = () => {
        const message = `Join my chat room "${roomName}" using this link: ${roomLink} with Room Name: ${roomName}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    };

    const shareViaEmail = () => {
        const subject = "Join My Chat Room";
        const body = `Hey,\n\nJoin my chat room "${roomName}" using the link below:\n${roomLink} \n Room Name: ${roomName}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900 text-white p-4 md:p-6">
            <div className="bg-gray-800 shadow-xl rounded-xl p-5 md:p-6 text-center w-full max-w-lg border border-gray-700">
                <FaCheckCircle className="text-green-400 text-4xl md:text-5xl mb-3" />
                <h2 className="text-xl md:text-2xl font-semibold">Room Created Successfully!</h2>
                <p className="text-gray-400 mt-2 text-sm md:text-base">Share this room link with others to join:</p>

                <div className="bg-gray-700 p-4 flex items-center justify-center flex-col rounded-lg mt-4 text-gray-300 text-lg md:text-xl break-words border border-gray-600">
                    <strong className="text-white">Room Name:</strong> {roomName} <br />
                </div>


                {/* Buttons - Stack on small screens */}
                <div className="flex flex-col justify-between md:flex-row gap-3 mt-5 w-full">
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
                    >
                        <FaCopy className="mr-2" /> Copy Link
                    </button>
                    <button
                        onClick={() => navigate(roomLink)}
                        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
                    >
                        <FaCopy className="mr-2" /> Navigate 🧭
                    </button>
                    <button
                        onClick={shareViaWhatsApp}
                        className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full md:w-auto"
                    >
                        <FaWhatsapp className="mr-2" /> WhatsApp
                    </button>
                    <button
                        onClick={shareViaEmail}
                        className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full md:w-auto"
                    >
                        <FaEnvelope className="mr-2" /> Email
                    </button>
                </div>

                <a href="/" className="mt-6 inline-block text-blue-400 hover:text-blue-500 transition text-sm md:text-base">Go to Home</a>
            </div>
        </div>
    );
};

export default RoomSuccess;
