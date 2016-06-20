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

router.post('/', function(req, res, next) {

    User.findOrCreate({where: {name: req.body.name, email: req.body.email} })
    .then(function(values){
      var user = values[0];

      var page = Page.build({
        title: req.body.title,
        content: req.body.content
        // status: req.body.status
      });

      return page.save().then(function(page) {
        return page.setAuthor(user);
      });

    })
    .then(function(page) {
      res.redirect(page.urlTitle);
    })
    .catch(next);
});

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
