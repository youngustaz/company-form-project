const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (if not already included)
app.use(express.static('public'));

// POST route to receive form data
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  const newEntry = {
    name,
    email,
    message,
    date: new Date().toISOString()
  };

  // Read existing data
  const filePath = path.join(__dirname, 'formData.json');
  let data = [];

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath);
    data = JSON.parse(raw);
  }

  data.push(newEntry);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.send(`
    <h2>Thank you, ${name}!</h2>
    <p>Your message has been received.</p>
    <a href="/">Go Back</a>
  `);
});
