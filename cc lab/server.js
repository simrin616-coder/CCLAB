const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// In-memory storage for users
const users = [];

// Sample courses (in-memory)
const courses = [
  { title: 'Web Development', description: 'Learn HTML, CSS, JS and Node.js' },
  { title: 'Python Programming', description: 'Learn Python for beginners and data science' },
  { title: 'Machine Learning', description: 'Intro to ML algorithms and AI concepts' },
];

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><p><a href="/register">Register</a> | <a href="/login">Login</a></p>');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.send('❌ User already exists. Try logging in.');
  }

  users.push({ name, email, password });
  res.send('✅ Registration successful! <a href="/login">Login now</a>');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.redirect('/courses');
  } else {
    res.send('❌ Invalid email or password.');
  }
});

app.get('/courses', (req, res) => {
  res.render('courses', { courses });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
