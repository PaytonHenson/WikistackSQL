var express = require('express');
var models = require('../models');
var Page = models.Page;
var User = models.User;

var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.query);
  Page.find(req.query.tagSearch);
  res.render('tagSearch');
})


module.exports = router;
