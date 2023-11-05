const jwt = require("jsonwebtoken");

const sign = "dharmik@1patel@2Vishnubhai";

const fetchUser = async (req, res, next) => {
  const token = req.header("auth_token");
  if (!token) {
    res.json({ error: "please validate using authorised method!1" });
  }
  // const token =
  //   "eyJahbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY5MzIzMjcyMzEyMywiaWF0IjoxNjkzMjMyNzIzfQ.CBrvOZ9TnbUfdDHEcuof9D9ZYhZr6of__-zKF-lGzJY";
  try {
    const user = await jwt.verify(token, sign);
    req.auth_id = user.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: "please validate using authorised method!2" });
  }
};
module.exports = fetchUser;
