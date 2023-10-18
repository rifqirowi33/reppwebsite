// server.js

const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000; // Ganti dengan port yang Anda inginkan

// Middleware untuk parsing body dari request
app.use(express.json());

// Fungsi untuk membaca file dari direktori
function readFile(file, callback) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data.trim());
    }
  });
}

// Endpoint untuk mendapatkan status
app.get('/api/status', (req, res) => {
  readFile('Asset/content/changeStatus.txt', (err, content) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ status: content });
    }
  });
});

// Endpoint untuk mengubah status
app.post('/api/status', (req, res) => {
  const { newStatus } = req.body;
  fs.writeFile('Asset/content/changeStatus.txt', newStatus, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update status' });
    } else {
      res.json({ message: 'Status updated successfully' });
    }
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
