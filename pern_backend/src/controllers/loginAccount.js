import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const magicKey = process.env.Kapishe;
const loginAccount = async (req, res) => {
  // connect to the Database
  const client = await pool.connect();
  try {
    // Get data for login from the frontend
    const { requestedData } = req.body;

    // Check data is not null, "we dont want to login a nobody right?"
    if (!requestedData || !requestedData.email || !requestedData.password) {
      return res
        .status(400)
        .json({ error: "incomplete or missing data, Check and try again..." });
    }

    const { email, password } = requestedData;
    // here we write a query to check if the Email submitted matches any of the emails in our database
    const response = await client.query(
      "SELECT * from registers WHERE email =$1",
      [email]
    );

    const user = response.rows[0]; // this rows[0] is where our recived data is coming in from the response

    // We check if the user doesn't exist and send a response
    if (!user) {
      return res
        .status(404)
        .json({ error: "Invalid response, Check your Email and try again" });
    }

    // if the user Exists we extract his password and unHash & compare it it returns a true or false
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // if false we send a message to the frontend
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({
          error: "Invalid credentials, Check your password and try again",
        });
    }
    // if true we use JWT to sign and give the user a token to use to access our secured pages
    const token = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
        userName: user.first_name + " " + user.last_name,
        userFirstName: user.first_name,
        userMobileNumber: user.mobile_number,
      },
      magicKey,
      { expiresIn: "1h" }
    );
    //   we store our Tokens to httpOnly cookies, best for cyber , Then send a successfull message
    res
      .cookie("Auth-token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 30 * 60 * 1000,
      })
      .json({ message: "Login successful!, Welcome " + user.first_name });
  } catch (error) {
    // if the try catch statments get any error it goes here
    console.error(`Query Error: ${error}`);
    res.status(400).json({ error: error.detail });
  } finally {
    // And we release the client from the database
    client.release();
  }
};

export { loginAccount };
