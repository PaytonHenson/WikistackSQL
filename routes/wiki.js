var express = require('express');
var models = require('../models');
var Page = models.Page;
var User = models.User;

var router = express.Router();

router.get('/', function(req, res) {
  Page.findAll()
    .then(function(pages) {
      console.log(pages[0].dataValues);
      res.render('index', {pages : pages});
    })
});

router.post('/', function(req, res) {

    var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
    });

    page.save()
    .then(function(page){
        res.redirect(page.urlTitle);
    });
});

// router.get('/:urlTitle', function (req, res) {
//   res.send(req.params.urlTitle);
// })

// Add pages
router.get('/add', function(req, res) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne( {where: { urlTitle : req.params.urlTitle }})
    .then(function(page) {
      var locals = { title: page.title, content: page.content};
      res.render('wikipage', locals);
    })
    .catch(next);
});

router.post('/add', function(req, res) {
  res.render('index');
});

module.exports = router;
