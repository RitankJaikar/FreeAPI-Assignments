# Advanced Authentication Architecture

A professional-grade React authentication system utilizing centralized state management, automated API handshakes, and secure route guarding.

## 🚀 Core Routing Logic

### 1. Route Guarding & Protected Routes

Implements **High-Order Component (HOC)** patterns to manage access control:

- **Protected Routes:** Mandates active sessions. Unauthorized access to `/auth/me` triggers an immediate `replace` redirect to login.
- **Public-Only Routes:** Prevents authenticated users from accessing `/login` or `/register` by bouncing them back to the dashboard.

### 2. Reactive State & Nested Routing

- **AuthContext:** Single source of truth for global user state. State changes (like logout) trigger immediate reactive re-routing.
- **Nested Architecture:** Uses `react-router-dom` v6 nested routes under `/auth/*` for deep-linking persistence and layout stability.
- **Slash Resilience:** Logic-based path sanitization to handle trailing slashes (e.g., `/auth/me/`) without breaking UI state.

## 🛠️ Infrastructure & Services

### `axiosInstance.js` (The Interceptor)

- **Base Configuration:** Centralized API URL and timeout settings.
- **Request Interceptors:** Automatically attaches `Authorization: Bearer <token>` to every outgoing request.
- **Response Interceptors:** Globally catches `401 Unauthorized` errors to trigger automatic logout/cleanup.

### `authService.js` (The Logic Layer)

- **Stateless Requests:** Encapsulates `login`, `register`, and `getCurrentUser` API calls.
- **Unified Response Handling:** Normalizes backend responses for the UI layer.
- **Auto-Login Flow:** Logic to chain registration success directly into a login session.

### `tokenStorage.js` (The Vault)

- **Abstraction Layer:** Centralized management of JWT/Session tokens.
- **Security:** Handles `get`, `set`, and `remove` operations; can be easily swapped between `localStorage` or `sessionStorage` without affecting the app.

## 🏗️ Architecture Flow (Bottom-to-Top)

To understand the data dependency and component hierarchy, follow the structure from the lowest infrastructure level to the top-level UI:

1. **tokenStorage.js**: Low-level utility for persistent storage management.
2. **axiosInstance.js**: Network layer using storage for request decoration.
3. **authService.js**: Business logic utilizing the network layer for API calls.
4. **AuthContext.jsx**: Global state provider wrapping the logic for application-wide use.
5. **AuthForm.jsx**: Reusable UI component executing context-driven actions.
6. **AuthPage.jsx**: Top-level route orchestrator managing layout and sub-routing.

## ⚡ Technical Highlights

- **Route Guards:** Enforced at the component level to prevent manual URL tampering.
- **Loading States:** Atomic `loading` flags to prevent race conditions during API handshakes.
- **Error Logging:** Intercepted console groups for step-by-step debugging of the auth flow.
