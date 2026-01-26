const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Root@123',   // your MySQL password
  database: 'student_db'
});

db.connect(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('MySQL Connected');
});

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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
