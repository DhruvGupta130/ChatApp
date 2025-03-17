import axios from "axios";
import {BACKEND_URL} from "./config.js";

const API_BASE_URL = `${BACKEND_URL}/api`;

export const createRoom = async (roomName) => {
    return axios.post(`${API_BASE_URL}/rooms`, roomName, {
        headers: { "Content-Type": "text/plain" },
    });
};

export const joinRoom = async (roomName, password) => {
    return axios.get(`${API_BASE_URL}/rooms?roomName=${roomName}&password=${password}`);
};

export const getMessages = async (roomName) => {
    return axios.get(`${API_BASE_URL}/rooms/messages?roomName=${roomName}`);
};

export const deleteRoom = async (roomName) => {
    await axios.delete(`${API_BASE_URL}/rooms/${roomName}`);
}