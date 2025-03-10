const jwt = require("jsonwebtoken");
require("dotenv").config();
const sign = process.env.JWT_KEY;

const fetchUser = async (req, res, next) => {
  const token = req.header("auth_token");
  if (token === null || token === "" || token === " ") {
    res.json({ EmptyJWT: "empty JWT" });
    return;
  }
  if (!token) {
    res.json({ error: "please validate using authorised method!1" });
  }
  try {
    const user = jwt.verify(token, sign);
    req.email = user.email;
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: "please validate using authorised method!2" });
  }
};
module.exports = fetchUser;
