Claim Management System
A full-stack application for managing bond claims with form submission and a responsive claim table.

Tech Stack
Frontend: React, Tailwind CSS

Backend: Node.js, Express

Database: MySQL

Setup Instructions
Clone the Repository:

git clone https://github.com/primehta17/wedigitproject.git
cd wedigitproject


Backend Setup:

cd backend
npm install
Create a .env file:

FRONTEND_URL=http://localhost:3000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=wedigit
PORT=5000

Run the backend:
node server.js

Frontend Setup:

cd frontend
npm install
npm start


Database Setup
CREATE DATABASE wedigit;

CREATE TABLE claims (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    claim_type ENUM('Medical', 'Property', 'Travel', 'Other') NOT NULL,
    claim_amount DECIMAL(10,2) NOT NULL CHECK (claim_amount >= 100 AND claim_amount <= 1000000),
    claim_description TEXT NOT NULL,
    document_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


API Endpoints
POST /api/claims - Add a new claim

GET /api/claims - Get all claims

