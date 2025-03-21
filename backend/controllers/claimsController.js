const express = require("express");
const multer = require("multer");
const db = require("../config/db");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

router.post("/", upload.single("document"), (req, res) => {
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

router.get("/", (req, res) => {
  console.log("GET /api/claims hit!");
  const query = "SELECT * FROM ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching claims:", err);
      return res.status(500).json({ error: "Error fetching claims" });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
