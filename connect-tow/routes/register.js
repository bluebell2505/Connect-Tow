import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    const { name, email, password, 'confirm-password': confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        
        // Redirect to home page after successful registration
        res.redirect('/'); // Redirect to the home page
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default router;
