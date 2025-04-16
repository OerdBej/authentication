
# 🔐 Advanced Authentication Backend with Token-Based Auth

This project is a backend boilerplate designed for a **secure user authentication system** using **token-based auth (JWT)**, email verification, and best backend practices. It is the backend counterpart of a **sign-in form with advanced authentication**, and is styled on the frontend with **Tailwind CSS v4.0**.

---

## 🚀 Tech Stack

This project is built with:

- **Node.js + Express** – for API routing and server setup.
- **MongoDB + Mongoose** – for NoSQL data storage and schema modeling.
- **JWT (jsonwebtoken)** – for token-based authentication.
- **bcryptjs** – for securely hashing user passwords.
- **cookie-parser** – for managing HTTP-only cookies.
- **dotenv** – for environment variable management.
- **Mailtrap** – for sending email verification in a dev-safe sandbox.
- **crypto** – for secure token generation.

---

## ✨ Features

- Full Sign-Up flow with:
  - Email, password, and name validation.
  - Password hashing (bcrypt).
  - Email verification via token.
- Token-based auth with **JWT**
- Cookie setup with security flags (`httpOnly`, `Secure`, etc.)
- Mailtrap integration for test-safe email delivery
- Clean MVC project structure (`routes/`, `controllers/`, `models/`)
- Setup ready for future features like login, reset password, etc.

---

## 📁 Folder Structure

```bash
.
├── controllers/         # Route logic
├── models/              # Mongoose schemas
├── routes/              # Express routes
├── mailtrap/            # Mail configuration
├── .env                 # Environment variables
├── server.js            # Main server entry
└── package.json
```

---

## 📦 Installation

```bash
npm install express cookie-parser mailtrap bcryptjs dotenv jsonwebtoken mongoose crypto
```

---

## ⚙️ .env Configuration

Create a `.env` file in the root of your project with the following variables:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
MAILTRAP_TOKEN=your_mailtrap_api_token
MAILTRAP_ENDPOINT=your_mailtrap_api_endpoint
```

> 🔐 **Keep your `.env` file private**. Never commit it to GitHub.

---

## 🛠️ How It Works (Overview)

### 1. Sign Up

- User submits name, email, and password.
- Backend:
  - Validates input.
  - Hashes password using bcrypt.
  - Generates a **verification token**.
  - Sends verification email via Mailtrap.
  - Stores user in DB (with `verified: false`).

### 2. Email Verification

- User receives a code/token via email.
- User enters the code in frontend UI.
- Backend verifies:
  - That the token matches.
  - That the token hasn't expired.
- If valid:
  - Marks user as `verified: true`.
  - Clears token from DB.

### 3. Token & Cookie Auth

- After sign-up or login:
  - A JWT is created and sent to client.
  - Stored as an **HTTP-only cookie**.
  - Used for all future authenticated requests.

---

## 🧪 Mailtrap Integration

- We use [Mailtrap.io](https://mailtrap.io) for safe, dev-environment email testing.
- Your email config is stored in `mailtrap/mail_config.js`.
- You can later replace Mailtrap with a production SMTP server (like SendGrid or AWS SES).

---

## 🧼 Best Practices

- Follow **MVC** structure to separate concerns.
- Use `.env` for secrets and config.
- Keep all responses clean — never send back a password (even if hashed).
- Use **middleware** for JSON parsing and validations.
- Secure cookies and tokens properly.

---

## 🎯 Goal of This Project

To build a production-ready backend for a sign-in/sign-up system with:

- 🧠 Modern and **secure authentication** practices
- 📧 **Email verification** built-in
- 💾 **Database integration** with MongoDB
- 🧪 Smooth **developer testing** using Mailtrap
- 🧩 Extendable base for login, logout, and password reset features

This will be paired with a **Tailwind CSS v4.0 frontend** to create a clean, minimal, and responsive authentication flow.

---

## 🛣️ Coming Next

- 🔐 Login route
- 🔁 Reset password flow
- 🛡️ Authorization middleware
- 📬 HTML email templates

---

## 👨‍💻 Author

Built with love for simplicity, discipline, and modern dev practices.

---

## 📄 License

MIT – Free to use and modify.
