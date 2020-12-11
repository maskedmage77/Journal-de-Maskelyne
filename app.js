const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');

// connect to mongodb
const nodeCredentials = require('./nodeCredentials');
mongoose.connect(nodeCredentials, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {app.listen(80);
        console.log('Connected to mongodb.');
        console.log('listening on port 80.');})
    .catch((err) => console.log(err));

// template engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    res.redirect('/posts');
});

//post routes
app.use('/posts', postRoutes);
