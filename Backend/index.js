const express = require('express');
const mysql = require('mysql2');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from your Next.js frontend
    methods: ["GET", "POST"],        // Allow GET and POST methods
    credentials: true                // Allow cookies if needed
  }
});

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'comments_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
app.post('/api/login', (req, res) => {
  const sessionID = uuidv4();
  res.json({ sessionID });
});

app.get('/api/comments', (req, res) => {
  db.query('SELECT * FROM comments ORDER BY timestamp DESC', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/comments', (req, res) => {
  const { username, comment } = req.body;
  const query = 'INSERT INTO comments (username, comment) VALUES (?, ?)';
  db.query(query, [username, comment], (err, result) => {
    if (err) throw err;
    const newComment = { id: result.insertId, username, comment, timestamp: new Date() };
    io.emit('new-comment', newComment);
    res.json(newComment);
  });
});



server.listen(4000, () => {
  console.log('Server running on port 4000');
});
