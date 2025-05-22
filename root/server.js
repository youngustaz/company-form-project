const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (like CSS, JS) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for root URL, send Company.html explicitly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Company.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const formData = req.body;
  const filePath = path.join(__dirname, 'applications.json');

  let applications = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    applications = JSON.parse(data);
  }

  applications.push(formData);

  fs.writeFileSync(filePath, JSON.stringify(applications, null, 2));

  res.send('Form submitted successfully!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
