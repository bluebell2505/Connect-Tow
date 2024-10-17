import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.get('/', (req, res) => {
    const userId = req.session.userId; // Get user ID from session
    res.render('login', { userId }); // Pass userId to the template
});
// POST route to handle login
router.post('/', async (req, res) => {
    const { email, password } = req.body; // Get email and password

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // If login is successful, set user ID in the session
        req.session.userId = user._id; // Store user ID in session

        // Redirect to home page
        res.redirect('/'); // Redirect after successful login
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        res.redirect('/login');
    });
});


export default router;
