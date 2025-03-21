const express = require("express");
const fs = require("fs");
const router = express.Router();
const connection = require("../database/connection1");
const fetchUser = require("../middleware/fetchUser.js");
const multer = require("multer");

const ProfileImage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./backend/profile_images");
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname.split(".");

    cb(
      null,
      `${Date.now()}_${Math.floor(Math.random() * 10000000000)}.${
        originalname[originalname.length - 1]
      }`
    );
  },
});
const profileImageUpload = multer({ storage: ProfileImage });

const seller_logo_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/seller_logo");
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname.split(".");

    cb(
      null,
      `${Date.now()}_${Math.floor(Math.random() * 10000000000)}.${
        originalname[originalname.length - 1]
      }`
    );
  },
});
const sellerUpload = multer({ storage: seller_logo_storage });

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/products_images");
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname.split(".");

    cb(
      null,
      `${Date.now()}_${Math.floor(Math.random() * 10000000000)}.${
        originalname[originalname.length - 1]
      }`
    );
  },
});
const productUpload = multer({ storage: productStorage });

router.post(
  "/userdetails",
  fetchUser,
  profileImageUpload.single("profileImage"),
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
      const query = `UPDATE \`user_data\` SET \`profileImage\`='${image}',\`firstname\`='${firstname}',\`lastname\`='${lastname}',\`address\`='${address}',\`phone\`='${mobilenumber}',\`Birthdate\`='${Birthdate}',\`gender\`='${Gender}' WHERE auth_id = ${auth_id};`;

      connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    }
  }
);
router.post("/fetchUserDetails", fetchUser, async (req, res) => {
  const auth_id = req.auth_id;
  const query = `SELECT  \`profileImage\`,\`firstname\`, \`lastname\`, \`address\`, \`phone\`, \`emailaddress\`, \`Birthdate\`, \`gender\` FROM \`user_data\` WHERE auth_id = ${auth_id}`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post(
  "/registerSeller",
  sellerUpload.single("sellerLogo"),
  fetchUser,
  async (req, res) => {
    const FirmName = req.body.FirmName;
    const FirmAddress = req.body.FirmAddress;
    const FirmPhone = req.body.FirmPhone;
    const FirmEmail = req.body.FirmEmail;
    const GSTNo = req.body.GSTNO;
    const LogoName = req.file.filename;
    const auth_id = req.auth_id;
    const seller_id = Date.now();

    const query0 = `SELECT \`seller_id\` FROM \`seller_data\` WHERE auth_id=${auth_id}`;
    connection.query(query0, (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        const query1 = `UPDATE \`seller_data\` SET \`firm_name\`='${FirmName}',\`firm_address\`='${FirmAddress}',\`firm_phone\`='${FirmPhone}',\`firm_email\`='${FirmEmail}',\`firm_logo\`='${LogoName}',\`GSTNO\`='${GSTNo}' WHERE seller_id=${result[0].seller_id}`;
        connection.query(query1, (err, result) => {
          if (err) throw err;
          res.send("done1");
        });
      } else {
        const query = `INSERT INTO \`seller_data\`(\`firm_name\`, \`firm_address\`, \`firm_phone\`, \`firm_email\`, \`firm_logo\`, \`GSTNO\`, \`auth_id\`, \`seller_id\`) VALUES ('${FirmName}','${FirmAddress}','${FirmPhone}','${FirmEmail}','${LogoName}','${GSTNo}','${auth_id}','${seller_id}')`;
        connection.query(query, (err, result) => {
          if (err) throw err;
          res.send("done2");
        });
      }
    });
  }
);
router.post("/fetchSellerData", fetchUser, (req, res) => {
  const auth_id = req.auth_id;
  const query = `SELECT \`firm_name\`, \`firm_address\`, \`firm_phone\`, \`firm_email\`, \`firm_logo\`, \`GSTNO\` FROM \`seller_data\` WHERE auth_id = ${auth_id}`;

  connection.query(query, (err, result) => {
    if (err) throw err;
    if (result[0]) {
      res.json(result[0]);
    } else {
      res.json({
        error: "Your are not a seller, Setup Your seller Account Now!",
      });
    }
  });
});

router.post(
  "/insertProduct",
  fetchUser,
  productUpload.array("productImages"),
  async (req, res) => {
    const auth_id = req.auth_id;
    var seller_id = 0;
    const Name = req.body.Name;
    const Category = req.body.Category;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Product_id = Date.now();
    var image = "";
    for (var i = 0; i < req.files.length; i++) {
      image = image + req.files[i].filename + ";";
    }
    const query0 = `SELECT \`seller_id\` FROM \`seller_data\` WHERE auth_id=${auth_id}`;
    connection.query(query0, (err, result) => {
      if (err) console.log(err);
      if (result.length > 0) {
        seller_id = parseInt(result[0].seller_id);
        const query = `INSERT INTO \`products\`(\`seller_id\`, \`product_id\`, \`name\`, \`category\`, \`image\`, \`description\`, \`price\`, \`rating\`) VALUES ('${seller_id}','${Product_id}','${Name}','${Category}','${image} ','${Description}','${Price}','4.5')`;
        connection.query(query, (err, result) => {
          if (err) throw err;
          res.send(result);
        });
      } else {
        res.send(result.length);
      }
    });
  }
);
router.post("/fetchProducts", async (req, res) => {
  const query = `SELECT \`product_id\`, \`name\`, \`category\`, \`image\`, \`description\`, \`price\`, \`rating\` FROM \`products\` WHERE 1`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
router.post("/fetchProductsId", profileImageUpload.none(), async (req, res) => {
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
  const product_id = req.body.product_id;
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
        productIdArray.push(value1[0]);
        productCountArray.push(value1[1]);
      });
      const index = productIdArray.indexOf(`${product_id}`);

      productIdArray.pop();
      productCountArray.pop();
      if (index < 0) {
        productIdArray.push(product_id);
        productCountArray.push("1");
      } else {
        productCountArray[index] = parseInt(productCountArray[index]) + 1;
      }

      for (var i = 0; i < productIdArray.length; i++) {
        variableString =
          variableString +
          `${parseInt(productIdArray[i])}x${parseInt(productCountArray[i])};`;
      }

      const query = `UPDATE \`cart\` SET \`product_id\`='${variableString}' WHERE auth_id=${auth_id}`;
      connection.query(query, (err, result) => {
        if (err) throw err;
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
router.post("/emptyCart", fetchUser, async (req, res) => {
  const auth_id = req.auth_id;
  const query = `UPDATE \`cart\` SET \`product_id\`='' WHERE auth_id=${auth_id};`;
  console.log(query);
  connection.query(query, (err, result) => {
    if (err) console.log(err);
    res.json(result[0]);
    console.log(result);
  });
});

router.post("/InsertLikes", fetchUser, (req, res) => {
  const auth_id = req.auth_id;
  const product_id = req.body.product_id.toString();

  if (!product_id) {
    res.json({ error: "No product Id provided!" });
    return;
  }
  var LikedProducts = "";

  const query = `SELECT  \`product_ids\` FROM \`likeditems\` WHERE auth_id = ${auth_id}`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    const products = result[0].product_ids.split(";");
    products.pop("");
    if (products.includes(product_id)) {
      res.json({ alreadyPresent: "product is already in likes!" });
    } else {
      products.push(product_id);
      products.forEach((element) => {
        LikedProducts = LikedProducts + element + ";";
      });
      const query1 = `UPDATE \`likeditems\` SET \`product_ids\`='${LikedProducts}' WHERE auth_id = ${auth_id};`;
      connection.query(query1, (err, result) => {
        if (err) throw err;
      });
      res.json({ success: "Product Added to Favourites!" });
    }
  });
});

router.post("/fetchLikedItems", fetchUser, (req, res) => {
  const auth_id = req.auth_id;
  const query = `SELECT \`product_ids\` FROM \`likeditems\` WHERE auth_id=${auth_id}`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    if (result[0]) {
      const products = result[0]?.product_ids.split(";");
      products.pop("");
      res.json(products);
    } else {
      res.json({ error: "unknown errors" });
    }
  });
});

router.post("/DeleteLikes", fetchUser, (req, res) => {
  const auth_id = req.auth_id;
  const product_id = req.body.product_id;
  var productQuery = "";
  const query = `SELECT \`product_ids\` FROM \`likeditems\` WHERE auth_id=${auth_id}`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    const products = result[0].product_ids.split(";");
    products.pop("");
    if (products.includes(`${product_id}`)) {
      products.splice(products.indexOf(`${product_id}`), 1);
      products.forEach((element) => {
        productQuery = productQuery + element + ";";
      });
      const query1 = `UPDATE \`likeditems\` SET \`product_ids\`='${productQuery}' WHERE auth_id=${auth_id}`;
      connection.query(query1, (err, result) => {
        if (err) throw err;
        res.json({ success: "Product Deleted Successfully!" });
      });
    } else {
      res.json({
        noProducts: "No Such Products Present in Your Favourites List!",
      });
    }
  });
});

module.exports = router;

//dead routes

// router.post("/products", fetchUser, async (req, res) => {
//   const auth_id = req.auth_id;
//   const product_id = Date.now();
//   const name = req.body.name;
//   const description = req.body.description;
//   const price = parseInt(req.body.price);

//   const query = `INSERT INTO \`products\`(\`auth_id\`, \`product_id\`, \`name\`, \`description\`, \`price\`) VALUES ('${auth_id}','${product_id}','${name}','${description}','${price}')`;
//   connection.query(query, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// router.post("/sellerdata", fetchUser, async (req, res) => {
//   const firmname = req.body.firmname;
//   const firmaddress = req.body.firmaddress;
//   const gstno = req.body.gstno;
//   const auth_id = req.auth_id;

//   const query1 = `UPDATE \`seller_data\` SET \`firm_name\`='${firmname}',\`firm_address\`='${firmaddress}',\`GSTNO\`='${gstno}' WHERE auth_id=${auth_id}`;
//   connection.query(query1, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });
