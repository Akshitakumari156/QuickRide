# User Authentication Module

This module provides user authentication functionality for the **UrbanMove** application. It includes user registration, login, and token-based authentication using **Node.js**, **Express**, **MongoDB**, and **JWT**.

---

## Features

- **User Registration**: Allows new users to register with their email, password, and other details.
- **User Login**: Authenticates users and generates a JSON Web Token (JWT) for session management.
- **Password Hashing**: Ensures secure storage of passwords using **bcrypt.js**.
- **Token-Based Authentication**: Issues JWT tokens for secure communication between the client and server.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **npm** (Node Package Manager)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/urbanmove.git
   cd urbanmove/Backend
   ```
2. Install dependencies:
   npm install
3. Create a .env file in the Backend directory and add the following environment variables:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
4. start the server :
   npm start

API Endpoints

1. Register User
   Endpoint: POST /api/register
   Description: Registers a new user.
   Request Body:
   {
   "firstname": "John",
   "lastname": "Doe",
   "email": "john.doe@example.com",
   "password": "password123"
   }
   Response:

{
"message": "User registered successfully",
"token": "jwt_token_here",
"user": {
"id": "user_id",
"firstname": "John",
# Backend — User Authentication

This document describes the authentication module used by the UrbanMove backend.
It explains how to set up, run, and use the user authentication API, plus important implementation notes for developers.

---

## Quick summary

- Tech: Node.js, Express, MongoDB (Mongoose), bcryptjs, jsonwebtoken (JWT)
- Responsibilities: register users, login, protect routes via JWT, logout (blacklist token)

---

## Files of interest

- `controllers/user.controllers.js` — register/login/logout/profile logic
- `models/user.model.js` — Mongoose schema, password hashing, JWT generation, password compare
- `routes/user.routes.js` — Express routes: `/register`, `/login`, `/profile`, `/logout`
- `middlewares/auth.middleware.js` — JWT validation middleware; attaches `req.user`

---

## Environment

Required environment variables (create `.env` in `Backend`):

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Use a strong, unpredictable value for `JWT_SECRET` in production.

---

## Installation & run (Backend)

1. From the `Backend` directory install deps:

```bash
npm install
```

2. Start the server (development):

```bash
npm start
```

The server listens on `process.env.PORT` (default 5000).

---

## Authentication flow (overview)

1. Registration (`POST /api/register`) — client submits `firstname`, `lastname`, `email`, `password`.
   - Controller validates input, ensures email uniqueness, creates a user.
   - Password is hashed in `user.model` using a `pre('save')` hook with `bcrypt`.
   - Controller returns a signed JWT (via `user.generateAuthToken()`), user summary, and 201 status.

2. Login (`POST /api/login`) — client submits `email` and `password`.
   - Controller loads user with `+password`, compares using `user.comparePassword()`.
   - On success returns JWT and user summary with 200 status.

3. Protecting routes — middleware `auth` reads `Authorization: Bearer <token>` header, verifies JWT, loads user and attaches it to `req.user`.

4. Logout (`POST /api/logout`) — protected route that blacklists the token (stored in `Blacklisttoken.modle.js`) to prevent reuse.

---

## API: Endpoints (examples)

Base path (example): `http://localhost:5000/api`

1) Register user

```
POST /api/register
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

Response (201):

```json
{
  "message": "User registered successfully",
  "token": "<jwt>",
  "user": { "id": "<id>", "firstname": "John", "email": "john.doe@example.com" }
}
```

2) Login

```
POST /api/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

Response (200):

```json
{
  "message": "Login successful",
  "token": "<jwt>",
  "user": { "id": "<id>", "firstname": "John", "email": "john.doe@example.com" }
}
```

3) Get profile (protected)

```
GET /api/profile
Authorization: Bearer <jwt>
```

Response (200): user object attached by middleware.

4) Logout (protected)

```
POST /api/logout
Authorization: Bearer <jwt>
```

Response (200): confirmation; server stores the token in a blacklist collection.

---

## Implementation notes (developer-focused)

- Password hashing: `user.model.js` uses a `pre('save')` hook to hash `this.password` with `bcrypt.hash(..., 10)` when modified.
- JWT creation: `user.generateAuthToken()` signs `{ _id: this._id }` with `process.env.JWT_SECRET` and `expiresIn: '1d'`.
- Password compare: `user.comparePassword(password)` delegates to `bcrypt.compare` and returns a Promise.
- Token blacklist: `Blacklisttoken.modle.js` stores invalidated tokens — middleware or route handlers should check this to block logged-out tokens.

Common pitfalls seen in this codebase:
- Ensure middleware functions are declared correctly as `async function auth(req, res, next) { ... }` and return/next appropriately.
- When reading `req.headers.authorization`, guard for missing headers before splitting.
- When calling `userModel.findOne(...).select('+password')` ensure the model exports are correct and `select: false` exists on the `password` field.

---

## Error handling & status codes

- 400: Bad request / validation errors (missing fields, invalid input)
- 401: Unauthorized (invalid/missing token)
- 404: Not found (user not found during login)
- 409: Conflict (email already registered)
- 500: Server error (database or unexpected errors)

Controllers should return consistent JSON shapes for easier client handling.

---

## Security recommendations

- Use HTTPS in production.
- Store `JWT_SECRET` in a secrets manager (not in plain `.env` in source control).
- Consider using short-lived access tokens with refresh tokens for better security.
- Rate-limit login endpoints to mitigate brute-force attacks.
- Validate and sanitize inputs.

---

## Testing tips

- Use Postman or curl to exercise endpoints.
- For automated tests, mock `process.env.JWT_SECRET` and use an in-memory MongoDB (e.g., `mongodb-memory-server`) for unit tests.

---

## Useful commands

```bash
# start server (dev)
npm start

# run linter / tests (if configured)
npm test
```

---

