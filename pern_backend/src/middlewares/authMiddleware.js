import jwt from "jsonwebtoken";

// get the bouncer middleware to check and authorize the tokens from the cookiejar
const bouncer = async (req, res, next) => {
  const rateLimit = req.rateLimit
  const token = req.cookies["Auth-token"];
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.Kapishe);
    if (!decoded) {
      return res.staus(401).json({error: 'Token Validation Failed'});
    }
    if(rateLimit.remaining <= 5 ){
      return res.json({error: "You have 5 trials left before your Access is temporaly Revoked"})
    }
    req.user = decoded;
    
    res.status(200)
    next();
  } catch (error) {
    res.clearCookie('Auth-token')
    res.status(500).json({ error: "Error Validating Token" });
    return;
  }
};
export { bouncer };
