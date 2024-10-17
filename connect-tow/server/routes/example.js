const express = require('express');
const router = express.Router();
const Post = require('../models/****'); // Replace with the path to your Post model

router.get('/****', async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from MongoDB

        res.render('*****', { posts: posts });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;