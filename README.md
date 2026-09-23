# 🔐 Authentication Backend API

A backend authentication system built with **Node.js, Express.js, MongoDB, and JWT**.

This project is being developed incrementally to understand and implement authentication concepts such as **user registration, email OTP verification, JWT access tokens, refresh tokens, session management, and multi-device logout**.

> 🚧 **Status:** Active Development  
> This project is continuously being improved as new authentication and backend security concepts are implemented.

## ✨ Current Features

The following features are currently implemented:

- [x] User registration
- [x] Username and email uniqueness validation
- [x] Password hashing
- [x] Email OTP generation
- [x] OTP hashing before database storage
- [x] OTP email delivery
- [x] Email verification
- [x] User login
- [x] JWT access token
- [x] JWT refresh token
- [x] Refresh token stored in HTTP-only cookie
- [x] Refresh token hashing
- [x] Session creation on login
- [x] Session storage in MongoDB
- [x] IP address tracking for sessions
- [x] User-Agent tracking for sessions
- [x] Access token refresh
- [x] Refresh token rotation
- [x] Current session logout
- [x] Logout from all devices
- [x] Protected `GET /get-me` endpoint


# 🏗️ Project Architecture

Client
  │
  ▼
Express.js Server
  │
  ├── Routes
  │
  ▼
Controllers
  │
  ├── Authentication Logic
  │
  ├── JWT Handling
  │
  ├── OTP Verification
  │
  └── Session Management
  │
  ├───────────────┬───────────────┐
  ▼               ▼               ▼
User Model    Session Model    OTP Model
  │               │               │
  └───────────────┴───────────────┘
                  │
                  ▼
               MongoDB

                  │
                  ▼
            Email Service


# 🔑 Authentication Flow

## 1. Registration

POST /api/auth/register
          │
          ▼
Check username/email
          │
          ▼
Hash password
          │
          ▼
Create user
          │
          ▼
Generate OTP
          │
          ▼
Hash OTP
          │
          ▼
Store OTP
          │
          ▼
Send OTP through email

## 2. Email Verification


POST /api/auth/verify-email
          │
          ▼
Receive OTP
          │
          ▼
Hash OTP
          │
          ▼
Compare with stored hash
          │
          ▼
Mark user as verified
          │
          ▼
Delete OTP records


## 3. Login

A user can log in only after successfully verifying their email.


Email + Password
       │
       ▼
Find User
       │
       ▼
Check Email Verification
       │
       ▼
Validate Password
       │
       ▼
Generate Refresh Token
       │
       ▼
Hash Refresh Token
       │
       ▼
Create Session
       │
       ├── User ID
       ├── Refresh Token Hash
       ├── IP Address
       └── User-Agent
       │
       ▼
Generate Access Token
       │
       ▼
Return Access Token
       │
       ▼
Store Refresh Token
in HTTP-only Cookie

# 🎟️ Access Token & Refresh Token

This project currently uses two types of JWT tokens.

### Access Token


Purpose: API authentication
Lifetime: 15 minutes


The access token is sent using:

```http
Authorization: Bearer <accessToken>
```

---

### Refresh Token

```text
Purpose: Generate new access tokens
Lifetime: 7 days
Storage: HTTP-only cookie
```

The refresh token itself is not stored in MongoDB.

Instead:

```text
Refresh Token
      │
      ▼
    SHA-256
      │
      ▼
Refresh Token Hash
      │
      ▼
MongoDB Session
```

---

# 🔄 Refresh Token Rotation

When the client requests a new access token:

```text
Refresh Token
      │
      ▼
Verify JWT
      │
      ▼
Hash Refresh Token
      │
      ▼
Find Active Session
      │
      ▼
Generate New Access Token
      │
      ▼
Generate New Refresh Token
      │
      ▼
Hash New Refresh Token
      │
      ▼
Update Session
      │
      ▼
Set New Refresh Token Cookie
```

This project uses **refresh-token rotation** instead of keeping the same refresh token throughout the entire session lifetime.

---

# 🖥️ Session Management

Every successful login creates a session.

A session contains:

```text
Session
├── user
├── refreshTokenHash
├── ip
├── userAgent
└── revoked
```

This allows the backend to manage authentication sessions independently.

For example:

```text
User
 │
 ├── Chrome
 │      └── Active
 │
 ├── Mobile
 │      └── Active
 │
 └── Firefox
        └── Active
```

---

# 🚪 Logout

Logout revokes the current session:

```text
Refresh Token
      │
      ▼
Find Session
      │
      ▼
revoked = true
      │
      ▼
Clear Cookie
```

The revoked session cannot be used to refresh an access token.

---

# 🚪 Logout From All Devices

The logout-all functionality revokes all active sessions belonging to the authenticated user.

```text
User
 │
 ├── Chrome     → revoked
 ├── Mobile     → revoked
 ├── Firefox    → revoked
 └── Other      → revoked
```

This provides a way for users to invalidate authentication sessions across multiple devices.

---

# 📡 API Endpoints

| Method | Endpoint                  | Status | Description             |
| ------ | ------------------------- | ------ | ----------------------- |
| POST   | `/api/auth/register`      | ✅      | Register a new user     |
| POST   | `/api/auth/verify-email`  | ✅      | Verify email using OTP  |
| POST   | `/api/auth/login`         | ✅      | Login user              |
| GET    | `/api/auth/get-me`        | ✅      | Get authenticated user  |
| POST   | `/api/auth/refresh-token` | ✅      | Refresh access token    |
| POST   | `/api/auth/logout`        | ✅      | Logout current session  |
| POST   | `/api/auth/logout-all`    | ✅      | Logout from all devices |

---

# 📁 Project Structure

```text
Auth-YT/
│
├── src/
│   │
│   ├── config/
│   │   └── config.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── session.model.js
│   │   └── otp.model.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── services/
│   │   └── email.service.js
│   │
│   ├── utils/
│   │   └── utils.js
│   │
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# 🛠️ Tech Stack

| Technology        | Purpose               |
| ----------------- | --------------------- |
| Node.js           | Backend runtime       |
| Express.js        | REST API framework    |
| MongoDB           | Database              |
| Mongoose          | MongoDB ODM           |
| JWT               | Authentication tokens |
| Crypto            | Token/OTP hashing     |
| HTTP-only Cookies | Refresh token storage |
| Email Service     | OTP delivery          |

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

> Never commit your `.env` file to GitHub.

Use `.env.example` instead.

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone <your-repository-url>
```

## 2. Navigate into the project

```bash
cd Auth-YT
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment variables

Create:

```text
.env
```

and add the required environment variables.

## 5. Start the development server

```bash
npm run dev
```

The API will run on:

```text
http://localhost:3000
```

---

# 🧪 Authentication Testing Flow

The recommended order for testing the API:

```text
1. Register
      ↓
2. Receive OTP
      ↓
3. Verify Email
      ↓
4. Login
      ↓
5. Receive Access Token
      ↓
6. Get Current User
      ↓
7. Refresh Access Token
      ↓
8. Logout
      ↓
9. Login Again
      ↓
10. Logout From All Devices
```

API testing can be performed using:

* Postman
* Thunder Client
* Insomnia

---

# 🔐 Security Concepts Implemented

This project currently demonstrates:

* Password hashing
* OTP hashing
* Refresh-token hashing
* JWT authentication
* Short-lived access tokens
* Long-lived refresh tokens
* HTTP-only cookies
* Session revocation
* Refresh-token rotation
* Email verification
* Multi-device logout
* IP tracking
* User-Agent tracking
* MongoDB unique indexes

---

# 🗺️ Development Roadmap

This project is intentionally being developed step-by-step.

## Authentication

* [x] Registration
* [x] Email OTP verification
* [x] Login
* [x] Access token
* [x] Refresh token
* [x] Refresh token rotation
* [x] Logout
* [x] Logout from all devices
* [x] Get current user

## Security Improvements

* [ ] Replace SHA-256 password hashing with Argon2id/bcrypt
* [ ] Add request validation
* [ ] Add centralized error handling
* [ ] Add rate limiting
* [ ] Add brute-force protection
* [ ] Add OTP expiration
* [ ] Add OTP attempt limits
* [ ] Add refresh-token reuse detection
* [ ] Improve cookie security configuration
* [ ] Add security headers

## Account Features

* [ ] Forgot password
* [ ] Reset password
* [ ] Change password
* [ ] Change email
* [ ] Resend OTP
* [ ] Account deletion
* [ ] Session/device management

## Authorization

* [ ] Authentication middleware
* [ ] Role-based authorization
* [ ] Permission system
* [ ] Admin authentication

## OAuth

* [ ] Google OAuth
* [ ] GitHub OAuth

## Testing

* [ ] Unit tests
* [ ] Integration tests
* [ ] Authentication flow tests
* [ ] Security tests

## API & Deployment

* [ ] Swagger/OpenAPI documentation
* [ ] Docker
* [ ] CI/CD
* [ ] Production deployment
* [ ] Logging and monitoring

---

# 📈 Project Development Log

This section will be updated as the project evolves.

### Current Milestone

**Authentication Core**

Implemented:

```text
Registration
      ↓
Email OTP Verification
      ↓
Login
      ↓
Access + Refresh Tokens
      ↓
Session Management
      ↓
Token Refresh
      ↓
Logout
      ↓
Logout All Devices
```

---

# 🎯 Project Goal

The goal of this project is to build a complete authentication system from the ground up while understanding the underlying backend and security concepts.

Instead of treating authentication as a black box, this project explores how:

```text
Users
 ↓
Passwords
 ↓
Email Verification
 ↓
JWT
 ↓
Sessions
 ↓
Refresh Tokens
 ↓
Token Rotation
 ↓
Session Revocation
```

work together in a real backend application.

---

# 📌 Current Status

```text
🟢 Core Authentication       Complete
🟢 Email Verification        Complete
🟢 JWT Authentication        Complete
🟢 Session Management        Complete
🟢 Refresh Token Rotation    Complete
🟢 Logout Management         Complete

🟡 Security Hardening        In Progress
🟡 Account Management        Planned
🟡 OAuth                     Planned
🟡 Testing                   Planned
🟡 Deployment                Planned
```

---

# 👨‍💻 Author

Nikhil Pandey

MERN Stack Developer | Backend Developer

Currently learning and building deeper expertise in:

```text
Node.js
Express.js
MongoDB
REST APIs
Authentication
JWT
Backend Security
System Design
```

---

⭐ **This project is actively maintained and continuously evolving.**

````
Modify date :  31-08-2026
Added : Add More content in Email Template for send OTP

📅 Development Update

Date: September 2, 2026

What We Implemented Today

Today, the project was improved with a proper database connection and server startup flow.

1. MongoDB Database Connection

Created a dedicated database configuration file:

src/
└── config/
    └── database.js

The database.js file is responsible for:

Connecting the application to MongoDB using Mongoose.
Reading the MongoDB connection URI from the configuration.
Handling database connection errors.
Preventing the application from continuing when the database connection fails.
2. Server Startup Flow

Updated the main server file so that:

The application loads.
MongoDB connection is established.
The HTTP server starts only after the database connection succeeds.

Current flow:

Application Start
       ↓
Connect to MongoDB
       ↓
Database Connected?
    ↙         ↘
  YES          NO
   ↓            ↓
Start Server   Exit Application

This prevents the backend from accepting requests when the required database connection is unavailable.
