
const express = require("express");
const bodyParser = require("body-parser");

const auth = require("./routes/auth");
const userdata = require("./routes/userdata");
const cors = require("cors");

const app = express();
app.use(cors());
app.use("/images", express.static(__dirname + "/images"));

app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.json());

// Authentication routes route
app.use("/auth", auth);

app.use("/userdata", userdata);

app.listen(5000, () => console.log("Server started on port 5000"));