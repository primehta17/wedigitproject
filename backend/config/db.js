const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "priyanka",
  database: "wedigit",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    throw err;
  }
  console.log("MySQL connected...");
});

module.exports = db;
