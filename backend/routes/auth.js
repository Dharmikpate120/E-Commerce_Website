const express = require("express");
// const connection = require("../database/connection1");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmail, validateString } = require("../utils/validators");
const authModel = require("../utils/Schema/Authentication");
const UserDetails = require("../utils/Schema/UserDetails");
const Cart = require("../utils/Schema/Cart");
const Like = require("../utils/Schema/Like");
const router = express.Router();

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
require("dotenv").config();
const secretKey = process.env.JWT_KEY;

// sql based signup
// router.post("/signup", async (req, res) => {
//   var username = req.body.username;
//   username = username.replaceAll("'", "''").replaceAll('"', '""');
//   let password = req.body.password;
//   password = await bcrypt.hash(password, salt);
//   const email = req.body.email;
//   const id = Date.now();

//   //checking if the entered email already exist in the database
//   const sql_verify = `SELECT \`id\` FROM \`authentication\` WHERE email="${email}"`;

//   await connection.query(sql_verify, async (err, result) => {
//     if (err) res.json({ eror: err });

//     //checking if the user exist already, error: if it exist, insert : if it doesn't exist
//     if (result?.length !== 0) {
//       res.json({ error: "a User with This email Already exist" });
//     } else {
//       const sql = `INSERT INTO \`authentication\`(\`email\`,\`username\`,  \`password\`, \`id\`) VALUES ('${email}','${username}','${password}','${id}')`;
//       const user = {
//         id: id,
//       };
//       const token = jwt.sign(user, Secret_Key);
//       connection.query(sql, (err) => {
//         if (err) throw err;
//       });
//       // insert ion query for user data
//       const query0 = `INSERT INTO \`user_data\`( \`auth_id\`,\`emailaddress\`) VALUES ('${id}','${email}')`;
//       connection.query(query0, (err, result) => {
//         if (err) throw err;
//       });

//       const cartInsertion = `INSERT INTO \`cart\`(\`auth_id\`) VALUES ('${id}')`;
//       connection.query(cartInsertion, (err, result) => {
//         if (err) throw err;
//       });

//       const likedInsertion = `INSERT INTO \`likeditems\`(\`auth_id\` ) VALUES ('${id}')`;
//       connection.query(likedInsertion, (err, result) => {
//         if (err) throw err;
//       });

//       // const query1 = `INSERT INTO \`seller_data\`( \`auth_id\`) VALUES ('${id}')`;
//       // connection.query(query1, (err, result) => {
//       //   if (err) throw err;
//       // });
//       res.json({ user: token });
//     }
//   });
// });

router.post("/signup", async (req, res) => {
  try {
    try {
      var body = req.body;
    } catch (error) {
      console.log(error.message);
      body = null;
    }
    if (!body) {
      return res.status(404).json({ error: "all fields are required!" });
    }
    var email = body.email;
    var password = body.password;
    var username = body.username;

    if (!email || !password || !username) {
      return res.status(404).json({ error: "all fields are required!" });
    }
    if (!validateEmail(email)) {
      return res.status(422).json({ error: "invalid email" });
    } else if (!validateString(username)) {
      return res.status(422).json({ error: "invalid username" });
    }
    const userCheck = await authModel.findOne({ email });
    if (userCheck?.email) {
      return res.status(409).json({ error: "User Already Exists!" });
    } else {
      try {
        password = bcrypt.hashSync(password, salt);
        const newUser = new authModel({
          email,
          password,
          username,
        });

        await newUser.save();
        const payload = { email };
        const token = jwt.sign(payload, secretKey, { expiresIn: "10d" });

        const ud = new UserDetails({ email });
        await ud.save();

        const cart = new Cart({ email, product_id: [] });
        await cart.save();

        const like = new Like({ email, product_ids: [] });
        await like.save();
        return res.json({
          success: "account created successfully!",
          user: token,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(404)
          .json({ error: "An unknown error occured, Please try again later!" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      error: "An unknown error occured, Please try again later!",
    });
  }
});

// sql based signin
// router.post("/signin", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const sql = `SELECT \`password\`, \`id\` FROM \`authentication\` WHERE email="${email}"`;
//   await connection.query(sql, async (err, result) => {
//     if (err) throw err;
//     if (result.length === 1) {
//       const password_hash = result[0].password;
//       const result1 = await bcrypt.compare(password, password_hash);
//       if (result1) {
//         const user = { id: result[0].id };
//         const token = jwt.sign(user, secretKey);

//         res.json({ user: token });
//       } else if (!result1) {
//         res.json({
//           error: "password didn't match please try again!",
//         });
//       }
//     } else {
//       res.json({ error: "user not found please signup" });
//     }
//   });
// });

router.post("/signin", async (req, res) => {
  try {
    try {
      var body = req.body;
    } catch (error) {
      console.log(error.message);
      body = null;
    }
    if (!body) {
      return res.status(404).json({ error: "all fields are required!" });
    }
    var email = body.email;
    var password = body.password;
    if (!email || !password) {
      return res.status(404).json({ error: "all fields are required!" });
    }
    if (!validateEmail(email)) {
      return res.status(422).json({ error: "invalid email" });
    }
    const userCheck = await authModel.findOne({ email });
    if (userCheck) {
      const password_hash = userCheck.password;
      const pass_result = await bcrypt.compare(password, password_hash);

      if (pass_result) {
        const user = { email: userCheck.email };
        const token = jwt.sign(user, secretKey);

        res
          .status(404)
          .json({ success: "account created successfully!", user: token });
      } else {
        res.status(404).json({
          error: "password didn't match please try again!",
        });
      }
    } else {
      res.status(404).json({ error: "User Not Found! Please Signup!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      error: "An unknown error occured, Please try again later!",
    });
  }
});

module.exports = router;
