const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validations/validation');

router.post('/register', async (req, res) => {
    // Validate the data before creating a user
    const {error} = registerValidation(req.body);
    if (error) {
        return res.status(400).send({message:error.details[0].message});
    }

    // Check if the user is already in the database
    const userExists = await User.findOne({email:req.body.email});
    if (userExists) {
        return res.status(400).send({message:'User already exists'});
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send({message:err});
    }
});

router.post('/login', async (req, res) => {
    // Validate the user data
    const {error} = loginValidation(req.body);
    if (error) {
        return res.status(400).send({message:error.details[0].message});
    }

    // Check if the user is in the database
    const user = await User.findOne({email:req.body.email});
    if (!user) {
        return res.status(400).send({message:'User does not exist'});
    }

    // Check if password is correct
    const passwordValidation = await bcryptjs.compare(req.body.password, user.password);
    if (!passwordValidation) {
        return res.status(400).send({message:'Incorrect password'});
    }

    // generate an auth token
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({'auth-token': token});
});

module.exports = router;