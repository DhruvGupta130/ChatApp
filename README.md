# 📢 Real-Time Chat Application

## 🚀 Overview
The **Real-Time Chat Application** is a web-based messaging platform designed for seamless and interactive communication. Built with **Spring Boot** on the backend and **React.js** on the frontend, it leverages **WebSockets** for real-time messaging and **PostgreSQL** for data persistence. The application ensures smooth and efficient user interactions through a responsive UI and a robust backend architecture.

## ✨ Features
- **Real-time messaging** using WebSockets
- **User authentication & active user tracking**
- **Persistent chat history** with PostgreSQL
- **Room-based chat system** for structured communication
- **Auto-scroll for chat messages**
- **Message persistence & history retrieval**
- **Secure WebSocket connection handling**
- **Toast notifications for key user actions**
- **Graceful WebSocket disconnection handling**

## 🛠️ Tech Stack
### Backend:
- **Spring Boot** (Java-based backend framework)
- **Spring WebSocket** for real-time messaging
- **Spring Data JPA** for database interaction
- **PostgreSQL** for data storage
- **Maven** for dependency management

### Frontend:
- **React.js** (component-based UI framework)
- **React Router** for navigation
- **Tailwind CSS** for responsive styling
- **React Icons** for UI enhancements
- **React Toastify** for notifications

## 📂 Project Structure
```
chat-app/
├── backend/                                # Spring Boot Backend
│   ├── src/main/java/com/chatapp/
│   │   ├── config/                         # WebSocket & Security Configurations
│   │   ├── controller/                     # API Controllers
│   │   ├── service/                        # Business Logic
│   │   ├── repository/                     # Database Repositories
│   │   ├── model/                          # Entity Models
│   ├── src/main/resources/
│   │   ├── application.properties          # Environment Configurations
│   ├── pom.xml                             # Maven Dependencies
│
├── frontend/                               # React Frontend
│   ├── src/
│   │   ├── components/                     # Reusable UI Components
│   │   ├── pages/                          # Page-Level Components
│   │   ├── context/                        # Global State Management
│   │   ├── services/                       # API and WebSocket Services
│   │   ├── App.js                          # Main App Component
│   │   ├── index.js                        # Entry Point
│   ├── package.json                        # Dependencies & Scripts
```

## ⚙️ Installation & Setup
### Prerequisites:
- **Java 17+** (for backend)
- **Node.js 16+** (for frontend)
- **PostgreSQL** (for database)

### 1️⃣ Backend Setup:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Set environment variables in `application.properties`:
```
DATASOURCE_URL=jdbc:postgresql://localhost:5432/chat
DATASOURCE_USERNAME=postgres
DATASOURCE_PASSWORD=root
```

### 2️⃣ Frontend Setup:
```bash
cd frontend
npm install
npm start
```

## 🔗 API Endpoints
### User & Room Management
| Method | Endpoint                     | Description                 |
|--------|------------------------------|-----------------------------|
| GET    | `/api/messages/{roomName}`   | Retrieve chat history       |
| GET    | `/api/users/active/{room}`   | Get active users in a room  |
| POST   | `/api/messages/send`         | Send a chat message         |
| DELETE | `/api/rooms/{roomName}`      | Delete a chat room          |

## 🏗️ Future Enhancements
- **User authentication (JWT-based login & registration)**
- **Typing indicators** for real-time user feedback
- **Message reactions** to enhance interactivity
- **File sharing support** (images, PDFs, etc.)
- **Voice/video call integration** for advanced communication

## 👨‍💻 Contributing
Contributions are always welcome! Feel free to submit issues and pull requests to improve the project.

## 🎖️ Acknowledgment
Crafted with dedication and expertise by **Dhruv Gupta**, ensuring seamless and robust real-time communication. 🚀
