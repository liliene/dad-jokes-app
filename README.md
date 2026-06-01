# 🎭 Dad Jokes App

> A full-stack web application delivering the world's finest groan-worthy humor — built with React.js, Node.js + Express, and the [icanhazdadjoke.com](https://icanhazdadjoke.com) public API.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Communication Flow](#communication-flow)
- [Features](#features)
- [Future Improvements](#future-improvements)

---

## Overview

Dad Jokes App is a modern, responsive full-stack web application that fetches random and searchable "dad jokes" from a public API. The project demonstrates:

- **Client-server architecture** with React on the frontend and Express on the backend
- **REST API design** with proper error handling and MVC-inspired structure
- **Proxy pattern**: the backend acts as an intermediary to the public joke API
- **React Hooks** for state management (`useState`, `useEffect`, `useCallback`)
- **CSS Modules** for scoped, maintainable styling

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React Frontend (Port 5173)               │   │
│  │   Components → Custom Hooks → Service Layer (fetch)  │   │
│  └──────────────────┬───────────────────────────────────┘   │
└─────────────────────┼───────────────────────────────────────┘
                      │ HTTP GET /api/jokes/*
                      ▼
┌─────────────────────────────────────────────────────────────┐
│            Node.js + Express Backend (Port 3001)            │
│  ┌──────────┐  ┌────────────┐  ┌──────────────────────┐    │
│  │ Middleware│→ │  Routes    │→ │  Controller          │    │
│  │ (CORS,   │  │ /api/jokes │  │  (req/res handling)  │    │
│  │  Morgan, │  │ /random    │  └──────────┬───────────┘    │
│  │  Logger) │  │ /search    │             │                 │
│  └──────────┘  └────────────┘             ▼                 │
│                                  ┌─────────────────┐        │
│                                  │  JokeService    │        │
│                                  │  (axios client) │        │
│                                  └────────┬────────┘        │
└───────────────────────────────────────────┼─────────────────┘
                                            │ HTTP GET
                                            ▼
                              ┌─────────────────────────┐
                              │  icanhazdadjoke.com API  │
                              │  (Public External API)   │
                              └─────────────────────────┘
```

### Why the Backend as a Proxy?

Instead of calling the public API directly from the browser, the frontend talks to our own backend. This approach:

- **Hides API keys** (if authentication is added later)
- **Centralizes error handling** and response formatting
- **Enables caching** and rate limiting in the future
- **Avoids CORS issues** with the external API

---

## Technologies

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework with hooks |
| Vite | Development server & build tool |
| CSS Modules | Scoped component styles |
| Syne + DM Mono | Typography |
| Fetch API | HTTP requests to backend |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express | HTTP server & routing |
| Axios | External API HTTP client |
| Morgan | HTTP request logging |
| dotenv | Environment variable management |
| cors | Cross-origin request configuration |

---

## Project Structure

```
dad-jokes-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── jokeController.js    # Handles req/res for joke routes
│   │   ├── routes/
│   │   │   └── jokeRoutes.js        # Defines /api/jokes/* endpoints
│   │   ├── services/
│   │   │   └── jokeService.js       # External API integration (axios)
│   │   ├── middlewares/
│   │   │   ├── errorMiddleware.js   # Global error handler
│   │   │   └── requestLogger.js     # Timestamped request logging
│   │   └── server.js                # Express app entry point
│   ├── .env                         # Environment variables (not committed)
│   ├── .env.example                 # Example env template
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx / .module.css
    │   │   ├── Footer.jsx / .module.css
    │   │   ├── JokeCard.jsx / .module.css
    │   │   ├── LoadingSpinner.jsx / .module.css
    │   │   ├── ErrorMessage.jsx / .module.css
    │   │   ├── SearchBar.jsx / .module.css
    │   │   └── SearchResults.jsx / .module.css
    │   ├── pages/
    │   │   ├── Home.jsx             # Main page composition
    │   │   └── Home.module.css
    │   ├── hooks/
    │   │   ├── useJoke.js           # Random joke fetching logic
    │   │   └── useSearch.js         # Joke search logic
    │   ├── services/
    │   │   └── jokeService.js       # fetch() calls to the backend
    │   ├── styles/
    │   │   └── global.css           # Design system & CSS variables
    │   ├── App.jsx                  # Root component
    │   └── main.jsx                 # React DOM entry point
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## Installation & Setup

### Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x

### 1. Clone the repository
```bash
git clone https://github.com/your-user/dad-jokes-app.git
cd dad-jokes-app
```

### 2. Install dependencies
```bash
# Install all at once using root scripts:
npm run install:all

# Or manually:
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure environment variables

**Backend** — copy the example file and adjust if needed:
```bash
cd backend
cp .env.example .env
```

Default `.env`:
```
PORT=3001
NODE_ENV=development
JOKES_API_URL=https://icanhazdadjoke.com
FRONTEND_URL=http://localhost:5173
```

**Frontend** — already configured to point to the backend:
```
VITE_API_BASE_URL=http://localhost:3001
```

### 4. Start the application

Open **two terminal windows**:

```bash
# Terminal 1 — Backend
npm run dev:backend
# → Server starts at http://localhost:3001

# Terminal 2 — Frontend
npm run dev:frontend
# → App opens at http://localhost:5173
```

---

## API Endpoints

Base URL: `http://localhost:3001`

### `GET /health`
Health check. Returns server status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "service": "dad-jokes-backend"
}
```

---

### `GET /api/jokes/random`
Returns a single random dad joke.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "R7UfaahVfFd",
    "joke": "My dog used to chase people on a bike a lot. It got so bad, finally I had to take his bike away."
  }
}
```

---

### `GET /api/jokes/search?q=dog&limit=5`
Searches jokes by keyword.

| Param | Type | Required | Description |
|---|---|---|---|
| `q` | string | ✅ | Search keyword |
| `limit` | number | ❌ | Max results (default: 10) |

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    { "id": "abc123", "joke": "Why don't dogs make good dancers? They have two left feet." },
    { "id": "def456", "joke": "I asked my dog what 2 minus 2 is. He said nothing." }
  ]
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Query parameter \"q\" is required and cannot be empty."
}
```

---

## Communication Flow

```
1. User opens the app
   └─→ React mounts → useJoke() hook fires

2. useJoke() calls jokeService.fetchRandomJoke()
   └─→ fetch("http://localhost:3001/api/jokes/random")

3. Express receives GET /api/jokes/random
   └─→ requestLogger logs timestamp + method
   └─→ jokeRoutes.js routes to jokeController.getRandomJoke()
   └─→ jokeController calls jokeService.getRandomJoke()
   └─→ jokeService sends axios GET to icanhazdadjoke.com
   └─→ External API returns: { id, joke, status }

4. jokeService extracts { id, joke } and returns to controller
   └─→ controller wraps in { success: true, data: { id, joke } }
   └─→ Express sends HTTP 200 JSON response

5. React receives the response
   └─→ useJoke() updates state: joke, loading=false
   └─→ JokeCard re-renders with new joke text + pop animation
```

---

## Features

- ✅ Random joke on load and on button click
- ✅ Keyword search for jokes
- ✅ Loading states with animated spinner
- ✅ Friendly error messages with retry
- ✅ Joke counter (gamification)
- ✅ Fully responsive (mobile & desktop)
- ✅ Accessible (ARIA labels, roles, live regions)

---

## Future Improvements

| Feature | Description |
|---|---|
| 🌙 Dark mode | CSS variable swap via toggle |
| ❤️ Favorites | Save liked jokes to localStorage or DB |
| 📜 History | Track previously shown jokes |
| 🔐 Auth | User accounts for personalized favorites |
| 🐳 Docker | Containerize both services with docker-compose |
| ✅ Tests | Jest + React Testing Library for frontend; Supertest for backend |
| 🚀 CI/CD | GitHub Actions pipeline for lint, test, deploy |
| 🗄️ Caching | Redis cache for frequently searched terms |
| 📊 Analytics | Track most popular joke searches |

---

## How REST API Consumption Works

The application demonstrates a **two-level API consumption** pattern:

1. **Frontend → Backend (Internal REST API)**
   - The React app uses the `Fetch API` to send HTTP GET requests to our Express backend
   - All requests go through a service layer (`src/services/jokeService.js`) that centralizes URL management and error parsing

2. **Backend → External API (icanhazdadjoke.com)**
   - The Express backend uses `axios` to forward requests to the public joke API
   - The `JokeService` class formats headers properly (the API requires `Accept: application/json`)
   - Responses are validated and normalized before being forwarded to the frontend

This **proxy architecture** keeps the frontend decoupled from the external API, making it trivially easy to swap joke providers without touching any frontend code.

---

## License

MIT — feel free to use, modify, and share. Just don't blame us for the jokes. 😄
