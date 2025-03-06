const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// mongoose.connect(process.env.DB_CONNECTOR, ()=>{
//     console.log('Connected to DB');
// })

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