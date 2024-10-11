// Import required packages
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Set up MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_speciality FROM providers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching providers:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Question 3: Filter patients by First Name
app.get('/patients/:firstName', (req, res) => {
  const { firstName } = req.params;
  const query = 'SELECT * FROM patients WHERE first_name = ?';
  db.query(query, [firstName], (err, results) => {
    if (err) {
      console.error('Error fetching patients by first name:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Question 4: Retrieve all providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const { specialty } = req.params;
  const query = 'SELECT * FROM providers WHERE provider_speciality = ?';
  db.query(query, [specialty], (err, results) => {
    if (err) {
      console.error('Error fetching providers by specialty:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
