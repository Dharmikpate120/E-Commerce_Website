const express = require("express");
const connection = require("../database/connection1");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Secret_Key = "dharmik@1patel@2Vishnubhai";
const router = express.Router();
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  let password = req.body.password;
  password = await bcrypt.hash(password, salt);
  const email = req.body.email;
  const seller = req.body.seller;
  const id = Date.now();

  //checking if the entered email already exist in the database
  const sql_verify = `SELECT \`id\` FROM \`authentication\` WHERE email="${email}"`;
  await connection.query(sql_verify, async (err, result) => {
    if (err) res.json({ eror: err });

    //checking if the user exist already, error: if it exist, insert : if it doesn't exist
    if (result.length !== 0) {
      res.json({ error: "a User with This email Already exist" });
    } else {
      const sql = `INSERT INTO \`authentication\`(\`email\`,\`username\`,  \`password\`, \`id\`) VALUES ('${email}','${username}','${password}','${id}')`;
      const user = {
        id: id,
      };
      const token = jwt.sign(user, Secret_Key);
      await connection.query(sql, (err) => {
        if (err) throw err;
      });
      //insertion query for user data
      const query0 = `INSERT INTO \`user_data\`( \`auth_id\`,\`email address\`) VALUES ('${id}','${email}')`;
      connection.query(query0, (err, result) => {
        if (err) throw err;
      });

      const cartInsertion =`INSERT INTO \`cart\`(\`auth_id\`) VALUES ('${id}')`
      connection.query(cartInsertion,(err,result)=>{
        if (err) throw err;
      })

      // const query1 = `INSERT INTO \`seller_data\`( \`auth_id\`) VALUES ('${id}')`;
      // connection.query(query1, (err, result) => {
      //   if (err) throw err;
      // });
      res.json({ user: token });
    }
  });
});
router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = `SELECT \`password\`, \`id\` FROM \`authentication\` WHERE email="${email}"`;
  await connection.query(sql, async (err, result) => {
    if (err) throw err;
    if (result.length === 1) {
      const password_hash = result[0].password;
      // console.log(result)
      const result1 = await bcrypt.compare(password, password_hash);
      // console.log(result1);
      if (result1) {
        const user = { id: result[0].id };
        // console.log(user);
        const token = jwt.sign(user, Secret_Key);

        res.json({ user: token });
      } else if (!result1) {
        res.json({
          error: "password didn't match please try again!",
        });
      }
      // console.log(result);
    } else {
      res.json({ error: "user not found please signup" });
    }
  });
});


module.exports = router;
