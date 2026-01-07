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
"email": "john.doe@example.com"
}
}

2. Login User
   Endpoint: POST /api/login
   Description: Authenticates a user and returns a JWT token.
   Request Body:

{
"email": "john.doe@example.com",
"password": "password123"
}
Response:
{
"message": "Login successful",
"token": "jwt_token_here",
"user": {
"id": "user_id",
"firstname": "John",
"email": "john.doe@example.com"
}
}
