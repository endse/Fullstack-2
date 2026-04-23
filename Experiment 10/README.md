# 🌊 ChatWave — Real-Time Chat Application

![ChatWave Banner](https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80&w=1200&h=400)

**ChatWave** is a modern, full-stack real-time messaging platform designed for seamless communication. Built with performance and security in mind, it leverages WebSockets for instantaneous message delivery and JWT for secure authentication.

## ✨ Features

- **Real-Time Messaging**: Instant delivery using WebSocket & SockJS.
- **Secure Authentication**: JWT-based login and registration system.
- **Dynamic UI**: Responsive design built with React and Vanilla CSS.
- **State Management**: Optimized frontend state for smooth user experience.
- **Database Persistence**: Reliable message and user storage with PostgreSQL.
- **Production Ready**: Configured for deployment on Render and Vercel.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: Vanilla CSS (Custom UI System)
- **Real-time**: [SockJS](https://github.com/sockjs/sockjs-client) & [StompJS](https://stomp-js.github.io/stomp-websocket/)
- **Deployment**: [Vercel](https://vercel.com/)

### Backend
- **Framework**: [Spring Boot](https://spring.io/projects/spring-boot)
- **Language**: Java
- **Security**: Spring Security + JWT
- **Real-time**: Spring WebSocket
- **Database**: PostgreSQL
- **Deployment**: [Render](https://render.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- JDK 17+
- PostgreSQL
- Docker (Optional for local setup)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/chiragyadav/ChatWave.git
   cd ChatWave
   ```

2. **Backend Setup**
   - Navigate to `backend` directory.
   - Configure `application.properties` with your PostgreSQL credentials.
   - Run the application:
     ```bash
     ./mvnw spring-boot:run
     ```

3. **Frontend Setup**
   - Navigate to `frontend` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```


## 📄 License

This project is licensed under the MIT License.

---

**Developed with ❤️ by [Chirag Yadav](https://github.com/endse)**
