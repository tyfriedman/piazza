const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv/config');

const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

app.use('/api/posts', postRoute);
app.use('/api/users', authRoute);

mongoose.connect(process.env.DB_CONNECTOR)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.error('DB connection error:', err);
    });

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})