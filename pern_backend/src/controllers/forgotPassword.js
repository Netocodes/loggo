import pool from "../db.js";
import crypto from "crypto";
import bcrypt from 'bcrypt'
import { mailmanReset } from "../services/mailman.js";
const frontend = process.env.frontendUrl;

const forgotPassword = async (req, res) => {
// get required Data
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ error: "Email is required to reset password" });
  }
// here we check if the Email exists but we dont send a doesn't exist messages so hackers don't Overdo themselves 
  const user = await pool.query("SELECT * FROM registers WHERE email = $1", [
    email,
  ]);
// check if it Exists silently
  if (user.rowCount > 0) {
    // generate token and hash then set to database
    const token = crypto.randomBytes(32).toString("hex"); // 64-char hex string
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour later
    const salted = await bcrypt.genSalt(10)
    const hashedToken = await bcrypt.hash(token, salted )
    // set reset link sent to Email for verification Purposes
    const resetLink = `${frontend}/reset-password?token=${hashedToken}`;

    // set token to database as the users reset token if a user doesnt have this his password cannot reset
    const resetQuery = await pool.query(
      "update registers set reset_token=$1, reset_token_expiry=$2 where email=$3 returning *",
      [hashedToken, expiresAt, email]
    );

    
    if (resetQuery.rowCount === 0) {
      return res.status(500).json({ error: "Failed to update reset token" });
    }
    // send Email
    mailmanReset(email, resetLink);

} 
// send response to the frontend
return res.json({ 
 message: 'If this email exists, a reset link was sent' 
});

};

export { forgotPassword };
