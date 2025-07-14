import pool from "../db.js";
import bcrypt from "bcrypt";
const ResetPassword = async (req, res) => {
  // Connect to the Database
  const client = await pool.connect();
  try {
    // get the required data needed to change a password
    const { requestedData } = req.body;
    // we are getting the tokens set in the url already encrypted, from the frontend and sending it back for verification
    const { token, newPassword } = requestedData;
    // salt and hash the new password we want to replace
    const salted = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salted);

    // Write a query that checks if the token Exists in the user records from our Database
    const request = client.query(
      `SELECT * FROM registers WHERE reset_token = $1`,
      [token]
    );
    if (!request) {
      res.status(404).json({ error: "Token authourization Failed." });
    }
    const data = await request;
    // if the response data is 0 it couldn't verify so we send a response
    if (data.rowCount === 0) {
      return res.status(404).json({ error: "Invalid, Used or expired Token, Request for a new link from the forgot password page" });
    } else {
      // if the token exists we get the id from the user and use it to check if the token has expired straight from the database
      let id = data.rows[0].id;
      // let passChild = data.rows[0].password;
      // where we check the timestamp for the token generated and if it has expired which results to a boolean as an answer
      const Bulldog = await client.query(
        `SELECT reset_token_expiry < CURRENT_TIMESTAMP AS has_expired from registers WHERE id = $1`,
        [id]
      );
      // if something went wrong with submiting
      if (!Bulldog) {
        res.status(400).json({ error: "Error vailidating Access..." });
      }
      const result = Bulldog;
      // if now we check if our query gives us a true or false if false we proceed to setting the new passowrd
      if (result.rows[0].has_expired === false) {
        // write query to change newpassword after hashing it
        const passManager = await client.query(
          `
               UPDATE registers SET password = $1 where id = $2`,
          [hashedPassword, id]
        );
        // if error happens in Submitting
        if (!passManager) {
          return res.status(400).json({ error: "Error changing Password" });
        }
        // if we get a response we could check if from the rowCount, if null its 0 else its greater than 0
        if (passManager.rowCount > 0) {
          res.status(200).json({ message: "Password changed Successfully."});
        } else {
          return res.status(400).json({ error: "Couldn't Change Password" });
        }
        // clear reset_token and expiry so no one else uses it twice
        const updateResult = client.query(
          `UPDATE registers 
                                                   SET reset_token = NULL,
                                                        reset_token_expiry = NULL WHERE id = $1
                                                        RETURNING id`,
          [id]
        );
        // Send successfull message
        res.status(200).json({message: "Reset Sucsessfull"})
      } else {
        return res
          .status(400)
          .send("Get the fuck out of here, Your 1 Hour is up !!!.");
      }
      // res.status(200).json({message: result.rows[0].has_expired})
    }
  } catch (error) {
    // if try catch catches an error it comes here
    res
      .status(500)
      .json({ error: `An Error occured in the Server, try again... ${error}` });
  } finally {
    // we send the client out from the database 
    client.release();
  }
};

export { ResetPassword };
