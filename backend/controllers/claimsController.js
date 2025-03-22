const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF or Word documents are allowed.'));
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

const validateClaim = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email format.'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required.')
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone number must be 10 digits.')
    .isNumeric()
    .withMessage('Phone number must contain only numbers.'),
  body('claim_type')
    .trim()
    .notEmpty()
    .withMessage('Claim type is required.'),
  body('claim_amount')
    .trim()
    .notEmpty()
    .withMessage('Claim amount is required.')
    .isFloat({ gt: 0 })
    .withMessage('Claim amount must be a positive number.'),
  body('claim_description')
    .trim()
    .notEmpty()
    .withMessage('Claim description is required.'),
];

router.post(
  '/',
  upload.single('document'),
  validateClaim,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        const fs = require('fs');
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      claim_type,
      claim_amount,
      claim_description,
    } = req.body;

    const document_url = req.file
      ? `http://localhost:6663/uploads/${req.file.filename}`
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
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Claim submitted successfully!' });
      }
    );
  }
);

router.get('/', (req, res) => {
  console.log('GET /api/claims hit!');
  const query = 'SELECT * FROM claims ORDER BY created_at';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching claims:', err);
      return res.status(500).json({ error: 'Error fetching claims' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
