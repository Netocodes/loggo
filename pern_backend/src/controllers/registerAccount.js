import pool from "../db.js";
import bcrypt from "bcrypt";
import { mailmanRegister } from "../services/mailman.js";
export const registerAccount = async (req, res) => {
  // firstly we connect to our PostgresQl 
  const client = await pool.connect();

  try {
    // get the data we would be needing from the frontend
    const { requestedData } = req.body;
    if (!requestedData) {
      return res
        .status(400)
        .json({ error: "incomplete or missing data, Check and try again..." });
    }
    const { firstName, lastName, email, password, mobile_number } = requestedData;
// verify data is not null
    if (!firstName || !lastName || !email || !password || !mobile_number) {
      return res
        .status(400)
        .json({ error: "incomplete or missing data, Check and try again..." });
    }
// Check that the provided password is not less than 8
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be more than 8 characters" });
    }
    //  salt and hash the password before sending back to the Database for security reasons
    const salted = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salted);

    // write a query to the backend inserting the provided data into the database, best practice not to directly insert into the database use this method  *, *, * RETURNING*, [1, 2, 3]

    const request = await client.query(
      "INSERT INTO registers( first_name, last_name, email, password, mobile_number) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, email, hashedPassword, mobile_number]
    );
    // check if the query went successfully without an error always return so that the next code doesnt execute
    if (!request) {
      return res
        .status(400)
        .json({ error: "Could not Register user, Check and try again..." });
    }
//  Send Thank you for registering email
const fullname = firstName + " " + lastName
    mailmanRegister(email, fullname)

    // Send response to the FrontEnd
    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (e) {
    // Here the try catch statement catches unknown errors, better for error handling
    console.log(`Query Error: ${e}`);
    res.status(400).json({ error: e.detail });
  } finally {
    // here we relese the connection to the pool meaning when a user submits a request eg "Register" this code runs once and disconects after code runs
    client.release();
  }
};
