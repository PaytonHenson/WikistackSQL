var express = require('express');
var models = require('../models');
var Page = models.Page;
var User = models.User;

var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/', function(req, res) {
    var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
    });

    page.save()
    .then(function(page){
        res.json(page);
    });
});

// Add pages
router.get('/add', function(req, res) {
  res.render('addpage');
});

router.post('/add', function(req, res) {
  res.render('index');
});

module.exports = router;
