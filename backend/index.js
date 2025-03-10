const express = require("express");
const auth = require("./routes/auth");
// const userdata = require("./routes/userdata");
const userdata_mongo = require("./routes/userdata_mongo");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();

app.use(cors());
app.use("/images", express.static(__dirname + "/images"));
app.use("/profile_images", express.static(__dirname + "/profile_images"));
app.use("/seller_logo", express.static(__dirname + "/seller_logo"));
app.use("/products_images", express.static(__dirname + "/products_images"));

app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json());

// Authentication routes route
app.use("/auth", auth);

//sql database
// app.use("/userdata", userdata);

//mongodb database
app.use("/userdata", userdata_mongo);

app.listen(5000, () => console.log("Server started on port 5000"));
