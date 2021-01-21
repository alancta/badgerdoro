const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
  //1. Destructure
  const jwtToken = req.header("token");
  console.log(req.header("token"));
  if (!jwtToken) {
    //if no jwt token, that means not authorized
    return res.status(403).json("Not authorized");
  }
  try {
    //verify with given token and secret, payload gets returned
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user; // ???
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not authorized");
  }
};
