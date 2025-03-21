const express = require("express");
const cors = require("cors");
const path = require("path");
const claimRoutes = require("./controllers/claimsController");
const dotenv =require('dotenv');
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/claims", claimRoutes);
const corsOptions ={
  origin: process.env.FRONTEND_URL,
  methods: ["GET","POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

app.listen(process.env.PORT, () => console.log(`Server running on port ${PORT}`));
