import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const port = process.env.PORT_NUMBER;
const app = express();
import { registerAccount } from "./controllers/registerAccount.js";
import { loginAccount } from "./controllers/loginAccount.js";
import { forgotPassword } from "./controllers/forgotPassword.js";
import { ResetPassword } from "./controllers/resetpasword.js";
import { bouncer } from "./middlewares/authMiddleware.js";
import rateLimit from "express-rate-limit";
import { LogoutUser } from "./controllers/logout.js";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 100,
  message: "Too many Requests, try again later.",
  standardHeaders: true, // Return `RateLimit-*` headers
  legacyHeaders: false,
});

const url = process.env.frontendUrl;
// MiddleWares for successful communication with the frontend
app.use(cors({ origin: url, credentials: true }));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Expose-Headers",
    "x-ratelimit-remaining, x-ratelimit-limit, retry-after"
  );
  next();
});

// Endpoint to check if a user is Autenticated

app.get("/secure-page", bouncer, (req, res) => {
  res.status(200).json({ message: req.user }); // Uses data from middleware
});
app.get("/logout-user", LogoutUser);

// Endpoint to register a new account
app.post("/register-account", registerAccount);

// Endpoint to verify login and set tokens
app.post("/login-account", loginAccount);

// Endpoint to send forgot Password Email to client/User and provide decrypted token for verification
app.post("/forgot-password", forgotPassword);

// Endpoint to change password after verifying decrypted reset token
app.post("/reset-password", ResetPassword);

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
  console.log("happy coding 😉");
});
