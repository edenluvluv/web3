//app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const path = require('path');
const session = require('express-session');


const app = express();
const port = 3000;

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true
}));


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.redirect('/login');
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

// Define a route handler for '/weather'
app.get('/weather', (req, res) => {
  res.render('weather');
});

app.get('/mainforadmin', (req, res) => {
  res.render('mainforadmin');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});




// Function to generate a random 6-digit user ID
function generateUserID() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
function isAdmin(req, res, next) {
  const username = req.session.username;
  if (!username) {
    return res.status(403).send('Access denied');
  }

  User.findOne({ username, isAdmin: true }, (err, user) => {
    if (err || !user) {
      return res.status(403).send('Access denied');
    }
    next();
  });
}


app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({
      username: username,
      password: password,
      userID: generateUserID(), // Call the generateUserID function here
      isAdmin: username === 'your_admin_username' // Set admin status based on username
    });
    res.render('success', { message: 'Registration successful', link: '/login' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Login POST route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(404).send('Invalid username or password');
    }

    // Redirect to corresponding page based on user role
    if (user.isAdmin) {
      res.redirect('/mainforadmin');
    } else {
      res.redirect('/weather');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Create User Route
app.post('/admin/create-user', isAdmin, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({
      username: username,
      password: password,
      userID: generateUserID(), // Call the generateUserID function here
      isAdmin: false // Set admin status to false as only admin can create admins
    });
    res.render('admin', { message: 'User created successfully' });
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Edit User Route
app.post('/admin/edit-user', isAdmin, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOneAndUpdate({ username }, { password }, { new: true });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('admin', { message: 'User edited successfully' });
  } catch (error) {
    console.error('User edit error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete User Route
app.post('/admin/delete-user', isAdmin, async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('admin', { message: 'User deleted successfully' });
  } catch (error) {
    console.error('User deletion error:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Main page route (only accessible after login)
app.get('/main', (req, res) => {
  res.render('main');
});

// Admin panel routes
app.get('/admin', isAdmin, (req, res) => {
  res.render('admin');
});

function isAdmin(req, res, next) {
  const username = req.session.username;
  if (!username) {
    return res.status(403).send('Access denied');
  }

  User.findOne({ username, isAdmin: true }, (err, user) => {
    if (err || !user) {
      return res.status(403).send('Access denied');
    }
    next();
  });
}


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});