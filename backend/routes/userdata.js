const express = require("express");
const fs = require("fs");
const router = express.Router();
const connection = require("../database/connection1");
const fetchUser = require("../middleware/fetchUser.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./backend/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${Math.floor(Math.random() * 10000000000)}.png`);
  },
});
//
const upload = multer({ storage: storage });
router.post(
  "/userdetails",
  fetchUser,
  upload.single("profileImage"),
  async (req, res) => {
    const auth_id = req.auth_id;
    const firstname = req.body.Firstname;
    const lastname = req.body.Lastname;
    const address = req.body.Address;
    const mobilenumber = req.body.Phone;
    const Birthdate = req.body.Birthdate;
    const Gender = req.body.Gender;
    const seller = req.body.seller;
    const image = req.file.filename;
    const query1 = `SELECT  \`profileImage\` FROM \`user_data\` WHERE auth_id = ${auth_id}`;
    connection.query(query1, (err, result) => {
      if (err) throw err;
      const path =
        "C:\\Users\\dhvani patel\\Desktop\\dharmik\\ecommerce website\\e_commerce-website\\backend\\images\\" +
        result[0].profileImage;
      fs.unlink(path, (err) => {});
    });
    if (seller === "0") {
      const query = `UPDATE \`user_data\` SET \`profileImage\`='${image}',\`firstname\`='${firstname}',\`lastname\`='${lastname}',\`address\`='${address}',\`phone\`='${mobilenumber}',\`Birthdate\`='${Birthdate}',\`gender\`='${Gender}',\`seller\` = ${seller} WHERE auth_id = ${auth_id};`;

      connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    }
    if (seller === "1") {
      const query = `UPDATE \`user_data\` SET \`profileImage\`='${image}',\`firstname\`='${firstname}',\`lastname\`='${lastname}',\`address\`='${address}',\`phone\`='${mobilenumber}',\`emailaddress\`='yet to come ',\`seller\` = ${seller} WHERE auth_id = ${auth_id};`;
      connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    }
  }
);
router.post(
  "/fetchUserDetails",
  fetchUser,
  upload.single("profileImage"),
  async (req, res) => {
    const auth_id = req.auth_id;
    const query = `SELECT  \`profileImage\`,\`firstname\`, \`lastname\`, \`address\`, \`phone\`, \`emailaddress\`, \`Birthdate\`, \`gender\` FROM \`user_data\` WHERE auth_id = ${auth_id}`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
);
router.post("/sellerdata", fetchUser, async (req, res) => {
  const firmname = req.body.firmname;
  const firmaddress = req.body.firmaddress;
  const gstno = req.body.gstno;
  const auth_id = req.auth_id;

  const query1 = `UPDATE \`seller_data\` SET \`firm_name\`='${firmname}',\`firm_address\`='${firmaddress}',\`GSTNO\`='${gstno}' WHERE auth_id=${auth_id}`;
  connection.query(query1, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/products", fetchUser, async (req, res) => {
  const auth_id = req.auth_id;
  const product_id = Date.now();
  const name = req.body.name;
  const description = req.body.description;
  const price = parseInt(req.body.price);

  const query = `INSERT INTO \`products\`(\`auth_id\`, \`product_id\`, \`name\`, \`description\`, \`price\`) VALUES ('${auth_id}','${product_id}','${name}','${description}','${price}')`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
router.post("/fetchProducts", async (req, res) => {
  const query = `SELECT \`product_id\`, \`name\`, \`category\`, \`image\`, \`description\`, \`price\`, \`rating\` FROM \`products\` WHERE 1`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
router.post("/fetchProductsId", upload.none(), async (req, res) => {
  const product_id = req.body.product_id;
  const products = product_id.split(";");
  var query = `SELECT \`product_id\`, \`name\`, \`category\`, \`image\`, \`description\`, \`price\`, \`rating\` FROM \`products\` WHERE product_id = ""`;
  products.forEach((element) => {
    query = query + ` OR product_id="${element}"`;
  });
  // const query = `SELECT * FROM \`products\` WHERE product_id=${product_id};`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
router.post("/addToCart", fetchUser, async (req, res) => {
  const auth_id = req.auth_id;
  const product_id = Number(req.body.product_id);
  const productIdArray = [];
  const productCountArray = [];
  var variableString = "";
  const query1 = `SELECT  \`product_id\` FROM \`cart\` WHERE auth_id=${auth_id} `;
  connection.query(query1, async (err, result) => {
    if (err) console.log(err);
    try {
      const value = result[0].product_id.split(";");
      value.forEach((element1) => {
        const value1 = element1.split("x");

        productIdArray.push((value1[0]));
        productCountArray.push((value1[1]));
      });
      const index = productIdArray.indexOf(product_id);
      productIdArray.pop();
      productCountArray.pop();
      if (index < 0) {
        console.log(productIdArray);
        productIdArray.push(product_id);
        productCountArray.push(1);
        console.log(productIdArray);
      } else {
        productCountArray[index] = productCountArray[index] + 1;
      }
     
      for (var i = 0; i < productIdArray.length; i++) {
        variableString =
          variableString + `${parseInt(productIdArray[i])}x${parseInt(productCountArray[i])};`;
      }

      console.log(variableString);
      const query = `UPDATE \`cart\` SET \`product_id\`='${variableString}' WHERE auth_id=${auth_id}`;
      connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(product_id);
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  });
});
router.post("/fetchCart", fetchUser, async (req, res) => {
  const auth_id = req.auth_id;
  const query = `SELECT \`product_id\` FROM \`cart\` WHERE auth_id=${auth_id};`;
  connection.query(query, (err, result) => {
    if (err) console.log(err);

    res.json(result[0]);
  });
});

module.exports = router;
