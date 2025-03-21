import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {BACKEND_URL} from "./config.js";
import {toast} from "react-toastify";

const SOCKET_URL = `${BACKEND_URL}/ws`; // Use HTTP for SockJS

let stompClient = null;

export const connectWebSocket = (roomName, onMessageReceived) => {
    if (stompClient && stompClient.connected) {
        console.log("WebSocket already connected");
        return;
    }

    stompClient = new Client({
        webSocketFactory: () => new SockJS(SOCKET_URL), // Use SockJS
        reconnectDelay: 5000, // Reconnect every 5 seconds if disconnected
        onConnect: () => {
            console.log("✅ Connected to WebSocket");

            // Unsubscribe existing subscriptions before subscribing again
            stompClient.unsubscribe(roomName);

            // Subscribe to the room
            stompClient.subscribe(`/topic/room/${roomName}`, (message) => {
                onMessageReceived(JSON.parse(message.body));
            });
        },
        onStompError: (frame) => {
            console.error("❌ WebSocket Error: ", frame);
        },
        onDisconnect: () => {
            console.warn("⚠️ WebSocket Disconnected. Attempting Reconnect...");
        },
    });

    stompClient.activate();
};

export const sendMessage = (roomName, sender, content) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: `/app/sendMessage/${roomName}`,
            body: JSON.stringify({ sender, content }),
        });
    } else {
        toast.error("Error while sending message, refreshing");
        console.error("❌ Cannot send message: WebSocket is not connected!");
        setTimeout(() => window.location.href="/", 1000);
    }
};

export const disconnectWebSocket = async () => {
    if (stompClient) {
        try {
            await stompClient.deactivate();
            console.log("🔴 WebSocket Disconnected");
        } catch (error) {
            console.error("❌ Error disconnecting WebSocket:", error);
        }
        stompClient = null;
    } else {
        console.warn("⚠️ No active WebSocket connection to disconnect.");
    }
};

