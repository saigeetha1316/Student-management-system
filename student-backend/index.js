const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to Aiven MySQL");
  }
});

module.exports = db;

app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    res.json(results);
  });
});

app.post('/students', (req, res) => {
  const { name, email, course } = req.body;

  db.query(
    'INSERT INTO students (name, email, course) VALUES (?, ?, ?)',
    [name, email, course],
    () => {
      res.send('Student added');
    }
  );
});

app.delete('/students/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM students WHERE id = ?', [id], () => {
    res.send('Student deleted');
  });
});

app.put('/students/:id', (req, res) => {
  const { name, email, course } = req.body;
  const id = req.params.id;

  db.query(
    'UPDATE students SET name=?, email=?, course=? WHERE id=?',
    [name, email, course, id],
    () => {
      res.send('Student updated');
    }
  );
});

app.get("/", (req, res) => {
  res.send("Student Management System Backend is running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
