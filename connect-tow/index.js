import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url'; // Importing fileURLToPath
import { dirname, join } from 'path'; // Importing dirname and join
import registerRoute from './routes/register.js';
import loginRoute from './routes/login.js'; 
import session from 'express-session';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET, // Change this to a secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Check if user is logged in before rendering
app.get('/profile', (req, res) => {
  if (req.session.userId) {
      res.render('profile'); // Render profile page if logged in
  } else {
      res.redirect('/login'); // Redirect to login if not logged in
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public'))); // Changed to join

// Set the view engine to ejs
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/TowConnect')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);

// Index page
app.get('/', (req, res) => {
  res.render('pages/index');
});

// About page
app.get('/about', (req, res) => {
  res.render('pages/about');
});

// Services page
app.get('/services', (req, res) => {
  res.render('pages/Service');
});

// Login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Register page
app.get('/register', (req, res) => {
  res.render('register');
});

// Start the server
app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
