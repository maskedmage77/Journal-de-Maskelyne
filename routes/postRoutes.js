const express = require('express');
const Post = require('../models/post');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// post routes
router.get('/', (req, res) => {
    Post.find().sort({ createdAt: -1}).limit(10)
        .then((result) => {
            res.render('index', {title: 'Home', posts: result})
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/search', (req, res) => {
    res.render('search', {title: 'Search'});
});

router.post('/search', (req, res) => {
    Post.find({title: new RegExp(req.body.title, "i")}).limit(10)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });


});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Post.findById(id)
        .then(result => {
            res.render('post', {title: result.title , post: result});
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
