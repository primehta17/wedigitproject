const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const claimRoutes = require('./controllers/claimsController');

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/claims', claimRoutes);

app.get("/",(req,res)=>{
  res.send("welcome to the product Api")
})

const PORT = process.env.PORT || 6663;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
