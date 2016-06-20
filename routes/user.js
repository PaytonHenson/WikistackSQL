var express = require('express');
var models = require('../models');
var Page = models.Page;
var User = models.User;

var router = express.Router();

router.get('/', function(req, res, next) {
    User.findAll({})
    .then(function(users) {
      res.render('users', {users : users});
    }).catch(next);
});

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  var userPromise = User.findById(req.params.id);
  var pagesPromise = Page.findAll({ where: {authorId: req.params.id}});

  Promise.all([userPromise, pagesPromise])
  .then(function(results) {
    var user = results[0];
    var pages = results[1];
    res.render('singleUser', {user: user, pages: pages});
  })
  .catch(next);
});

module.exports = router;