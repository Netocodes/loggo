import nodemailer from "nodemailer";
const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
  pool: true, // Enable connection pooling
  maxConnections: 5,
});
// Verify the transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter verification failed:", error);
  } else if (success) {
    console.log("Transporter is ready to send emails🚏💌");
  }
});

// send Reset Emails with the tokens, we do this by adding the data when the function is called then it send a message 
const mailmanReset = (email_to_send, reset_link) => {
    try {
        if (!email || !reset_link) {
    res.status(404).json({error: "main email account cannot be retrived"})
}


const mailOptions = {
  from: `Loggo ${email}`,
  to: email_to_send, 
  subject: 'Password Reset Request',
  text: `Click this link to reset your password: 
  ${reset_link}\n
  
  
  This link expires in 1 hour⌚.`,
  
  html: `
    <div style="padding: 20px; width: 100%;">
    <p style="font-size: 12px;">Click this link to reset your password:</p>
    <a href="${reset_link}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
      Reset Password
    </a>
    <p><small>This link expires in 1 hour.</small></p>
    <p style="width: 100%; overflow: hidden; padding-left: 20px; padding-right: 20px; text-align: center;">If you didn't order for the reset Password simply ignore the mail, it expires in 1 hour</p>
    </div>
  `
};

transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        res.status(400).json({
           error: "Could not send Mail..."
        })
    }
else{
        console.log("Email sent: " + info.response);
        res.status(200).json({
            message: "Email sent successfully"
        })
    }
})


    } catch (error) {
        console.error("Error creating transporter:", error);
        res.status(500).json({ error: "Failed to create email transporter" });
    }

}
// send Succesfull Registration emails when a new user Enters out Site
const mailmanRegister = (email_to_send, name) => {
try {
  if(!email_to_send || ! name){
    return res.status(404).json({error: "Could'nt retrive Email/Data to send to"})
  }
  
const mailOptions = {
  from: `Loggo ${email}`,
  to: email_to_send, 
  subject: 'New Registration',
  text: `
  Welcome to loggo, the ultimate demo app for authentication proccess`,
  
 html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2c3e50;">Welcome to Our App, ${name}!</h1>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for registering with us. We're excited to have you on board!
        </p>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Your account has been successfully created and you can now log in using the email address you provided.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:5173/login" 
             style="background-color: #3498db; 
                    color: white; 
                    padding: 12px 25px; 
                    text-decoration: none; 
                    border-radius: 5px;
                    font-weight: bold;">
            Get Started
          </a>
        </div>
        
        <p style="font-size: 14px; color: #7f8c8d;">
          If you didn't create an account with us, please ignore this email or contact support @netocodes.
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
          <p style="font-size: 14px; color: #7f8c8d;">
            © ${new Date().getFullYear()} Loggo. All rights reserved.
          </p>
        </div>
      </div>
    `
};

transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        res.status(400).json({
           error: "Could not send Mail..."
        })
    }
else{
        console.log("Email sent: " + info.response);
        res.status(200).json({
            message: "Email sent successfully"
        })
    }
})
} catch (error) {
  
}
}

export {
    mailmanReset,
    mailmanRegister
}