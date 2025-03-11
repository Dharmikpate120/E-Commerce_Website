const express = require("express");
const fs = require("fs");
const router = express.Router();
// const connection = require("../database/connection1");
const fetchUser = require("../middleware/fetchUser.js");
const multer = require("multer");
const path = require("path");
const UserDetails = require("../utils/Schema/UserDetails.js");
const SellerData = require("../utils/Schema/SellerData.js");
const Product = require("../utils/Schema/Product.js");
const Cart = require("../utils/Schema/Cart.js");
const Like = require("../utils/Schema/Like.js");

function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /png|jpe?g|gif|bmp|tiff?|webp|ico|svg/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: pdfs Only!");
  }
}

const ProfileImage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, `../profile_images`));
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname.split(".");

    cb(
      null,
      `${Date.now()}_${originalname[0]}.${
        originalname[originalname.length - 1]
      }`
    );
  },
});
const formParser = multer();
const profileImageUpload = multer({
  storage: ProfileImage,
  limits: { fileSize: 100000000 }, // Limit file size to 100MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profileImage");

const seller_logo_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, `../seller_logo`));
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname.split(".");

    cb(
      null,
      `${Date.now()}_${originalname[0]}.${
        originalname[originalname.length - 1]
      }`
    );
  },
});
const sellerUpload = multer({
  storage: seller_logo_storage,
  limits: { fileSize: 100000000 }, // Limit file size to 100MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("sellerLogo");

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, `../products_images`));
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname.split(".");

    cb(
      null,
      `${Date.now()}_${originalname[0]}.${
        originalname[originalname.length - 1]
      }`
    );
  },
});
const productUpload = multer({
  storage: productStorage,
  limits: { fileSize: 100000000 }, // Limit file size to 100MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("productImages");

router.post("/userdetails", fetchUser, async (req, res) => {
  profileImageUpload(req, res, async (err) => {
    if (err) {
      return res.json({ err });
    }
    if (req.file == undefined) {
      return res.json({ error: "No file selected!" });
    }
    try {
      const email = req.email;
      const firstname = req.body.Firstname;
      const lastname = req.body.Lastname;
      const address = req.body.Address;
      const mobilenumber = req.body.Phone;
      const Birthdate = req.body.Birthdate;
      const Gender = req.body.Gender;
      const seller = req.body.seller;
      const image = req.file.filename;
      if (
        !firstname ||
        !lastname ||
        !address ||
        !mobilenumber ||
        !Birthdate ||
        !Gender ||
        !seller ||
        !image
      ) {
        return res.status(404).json({ error: "All parameters are required!" });
      }

      const userdetails = await UserDetails.findOne({ email });
      if (!userdetails) {
        res.status(404).json({
          error:
            "Invalid User Identification, please signup from official website!",
        });
      }

      const updateDetails = await UserDetails.updateOne(
        { email },
        {
          firstname,
          lastname,
          address,
          mobilenumber,
          Birthdate,
          Gender,
          seller,
          image,
        }
      );
      if (updateDetails.modifiedCount) {
        if (userdetails.image) {
          try {
            fs.unlinkSync(`./profile_images/${userdetails.image}`);
            console.log("File deleted successfully");
          } catch (err) {
            console.error("Error deleting the file:", err);
          }
        }
        res.json({ success: "User Data Updated Successfully!" });
      } else {
        return res.status(404).json({
          error: "Error Updating The Database, Please Try Again Later!",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: "Internal Server Error!" });
    }
  });
});
router.post("/fetchUserDetails", fetchUser, async (req, res) => {
  try {
    const email = req.email;
    const result = await UserDetails.findOne({ email });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Internal Server Error" });
  }
});

router.post("/registerSeller", fetchUser, async (req, res) => {
  sellerUpload(req, res, async (err) => {
    if (err) {
      return res.json({ error: "Invalid File Type!" });
    }
    if (req.file == undefined) {
      return res.json({ error: "No file selected!" });
    }
    try {
      const FirmName = req.body.FirmName;
      const FirmAddress = req.body.FirmAddress;
      const FirmPhone = req.body.FirmPhone;
      const FirmEmail = req.body.FirmEmail;
      const GSTNo = req.body.GSTNO;
      const LogoName = req.file.filename;
      const email = req.email;
      const seller_id = Date.now();

      if (
        !FirmName ||
        !FirmAddress ||
        !FirmPhone ||
        !FirmEmail ||
        !GSTNo ||
        !LogoName ||
        !email ||
        !seller_id
      ) {
        return res.status(404).json({ error: "All parameters are required!" });
      }
      var result = await SellerData.findOne({ email });
      if (!result) {
        await SellerData.insertOne({
          FirmName,
          FirmAddress,
          FirmPhone,
          FirmEmail,
          GSTNo,
          LogoName,
          email,
          seller_id,
        });
        await UserDetails.updateOne({ email }, { seller: "1" });
        return res.json({ success: "Seller Data Inserted Successfully!" });
      } else {
        var result1 = await SellerData.updateOne(
          { email },
          {
            FirmName,
            FirmAddress,
            FirmPhone,
            FirmEmail,
            GSTNo,
            LogoName,
            email,
            seller_id,
          }
        );
        console.log(result1);
        if (result1.modifiedCount) {
          try {
            fs.unlinkSync(`./seller_logo/${result.LogoName}`);
            console.log("File deleted successfully");
          } catch (err) {
            console.error("Error deleting the file:", err);
          }
          return res.json({ success: "Seller Data Updated Successfully!" });
        }
      }
    } catch (err) {
      console.log(err);
      try {
        fs.unlinkSync(`./seller_logo/${result.image}`);
        console.log("File deleted successfully");
      } catch (err) {
        console.error("Error deleting the file:", err);
      }
      return res.status(400).json({ error: "Internal Server Error!" });
    }
  });
});
router.post("/fetchSellerData", fetchUser, async (req, res) => {
  try {
    const email = req.email;

    const result = await SellerData.findOne({ email });
    if (!result) {
      return res.json({
        error: "Your are not a seller, Setup Your seller Account Now!",
      });
    } else {
      return res.json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal Server Error!" });
  }
});

router.post("/insertProduct", fetchUser, async (req, res) => {
  productUpload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Invalid File Type!" });
    }
    if (req.files == undefined) {
      return res.json({ error: "No file selected!" });
    }
    try {
      const email = req.email;
      const name = req.body.Name;
      const category = req.body.Category;
      const description = req.body.Description;
      const price = req.body.Price;
      const image = req.files.map((img) => img.filename);
      const product_id = Date.now();
      console.log(image);
      if (!name || !category || !description || !price || !product_id) {
        return res.status(404).json({ error: "All parameters are required!" });
      }
      const result = await SellerData.findOne({ email });
      if (!result) {
        return res.status(404).json({ error: "You Are Not A Seller!" });
      } else {
        await Product.insertOne({
          email,
          name,
          category,
          description,
          price,
          product_id,
          image,
        });
        return res.json({ success: "Product Inserted Successfully!" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Internal Server Error!" });
    }
  });
});
router.post("/fetchProducts", async (_, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal Server Error!" });
  }
});

router.post("/fetchProductsId", formParser.none(), async (req, res) => {
  try {
    const product_id = JSON.parse(req.body.product_id);
    const products = await Product.find({ product_id });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Internal Server Error!" });
  }
});

router.post("/addToCart", fetchUser, async (req, res) => {
  try {
    const email = req.email;
    const product_id = req.body.product_id;

    var product = await Product.findOne({ product_id });
    if (!product) {
      return res
        .status(404)
        .json({ error: "Product With given ID doesn't exist!" });
    }
    var cart = await Cart.findOne({ email });
    var cartItem = cart?.product_id?.filter((el) => el.id === product_id);
    console.log(cartItem);
    if (cartItem.length) {
      cartItem[0].count = Number(cartItem[0].count) + 1;
      console.log(cartItem);
      await cart.save();
      return res.json({ success: "Item added to cart successfully!" });
    }
    cart?.product_id?.push({ id: product_id, count: 1 });
    await cart.save();
    return res.json({ success: "New Item Added To Cart Successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal Server Error!" });
  }
});

router.post("/fetchCart", fetchUser, async (req, res) => {
  const email = req.email;
  try {
    const cart = await Cart.findOne({ email });
    res.json(cart.product_id);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal Server Error!" });
  }
});
router.post("/emptyCart", fetchUser, async (req, res) => {
  const email = req.email;
  try {
    const cart = await Cart.findOne({ email });
    cart.product_id = cart.product_id.filter(() => false);
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal Server Error!" });
  }
});

router.post("/InsertLikes", fetchUser, async (req, res) => {
  try {
    const email = req.email;
    const product_id = req.body.product_id;

    if (!product_id) {
      return res.status(404).json({ error: "No product Id provided!" });
    }
    var product = await Product.findOne({ product_id });
    if (!product) {
      return res
        .status(404)
        .json({ error: "Product With given ID doesn't exist!" });
    }
    const likes = await Like.findOne({ email });
    if (likes.product_id.includes(product_id)) {
      likes.product_id = likes.product_id.filter((pi) => pi !== product_id);
      await likes.save();
      return res.json({ success: "Product Removed From Likes!" });
    }
    likes.product_id.push(product_id);
    await likes.save();
    return res.json({ successs: "Your Like Added Successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal Server Error!" });
  }
});

router.post("/fetchLikedItems", fetchUser, async (req, res) => {
  try {
    const email = req.email;
    const likes = await Like.findOne({ email });
    return res.json(likes.product_id);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal Server Error!" });
  }
});

router.post("/DeleteLikes", fetchUser, async (req, res) => {
  try {
    const email = req.email;
    const product_id = req.body.product_id;

    var product = await Product.findOne({ product_id });
    if (!product) {
      return res
        .status(404)
        .json({ error: "Product With given ID doesn't exist!" });
    }
    const likes = await Like.findOne({ email });
    if (!likes.product_id.includes(product_id)) {
      return res.status(404).json({ error: "Product is not in Your LIkes!" });
    }
    likes.product_id = likes.product_id.filter((el) => el !== product_id);
    await likes.save();
    return res.json({ successs: "Your Like Removed Successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
