const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "priyanka",
  database: "wedigit",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// File storage configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

// Claim submission endpoint
app.post("/api/claims", upload.single("document"), (req, res) => {
  const {
    name,
    email,
    phone,
    claim_type,
    claim_amount,
    claim_description,
  } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const document_url = req.file
    ? `http://localhost:7000/uploads/${req.file.filename}`
    : null;

  const query = `
    INSERT INTO claims (name, email, phone, claim_type, claim_amount, claim_description, document_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, email, phone, claim_type, claim_amount, claim_description, document_url],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Claim submitted successfully!" });
    }
  );
});

// Fetch all claims endpoint
app.get("/api/claims", (req, res) => {
  console.log("GET /api/claims hit!"); 
  const query = "SELECT * FROM claims ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching claims:", err);
      return res.status(500).json({ error: "Error fetching claims" });
    }
    res.status(200).json(results);
  });
});

const PORT = 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
