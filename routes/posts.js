const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const verifyToken = require('../verifyToken');

// routes without verification required
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (err) {
        res.status(400).send({ message: err });
    }
})

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.send(post);
    } catch (err) {
        res.status(400).send({ message: err });
    }
})

// routes with verification required
router.post('/', verifyToken, async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.body.createdBy
    });
    try {
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (err) {
        res.status(400).send({ message: err });
    }
})

router.put('/:postId', verifyToken, async (req, res) => {
    try {
        const updatedPost = await Post.findById(req.params.postId);
        if (updatedPost.createdBy !== req.body.email) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        if (req.body.title) {
            updatedPost.title = req.body.title;
        }
        if (req.body.description) {
            updatedPost.description = req.body.description;
        }
        const response = await Post.updateOne({ _id: req.params.postId }, { $set: { title: updatedPost.title, description: updatedPost.title } });
        res.send({status: response, post: req.params.postId});
    } catch (err) {
        res.status(400).send({ message: err });
    }
})

router.delete('/:postId', verifyToken, async (req, res) => {
    try {
        const removedPost = await Post.findById(req.params.postId);
        if (removedPost.createdBy !== req.body.email) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const response = await Post.deleteOne({ _id: req.params.postId });
        res.send({status: response, post: req.params.postId});
    } catch (err) {
        res.status(400).send({ message: err });
    }
})

module.exports = router;
