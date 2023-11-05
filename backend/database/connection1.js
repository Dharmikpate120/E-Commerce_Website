const { createConnection } = require("mysql");

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce-website",
  insecureAuth: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database!");
});

module.exports = connection;
