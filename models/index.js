var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
  title: { type: Sequelize.STRING},
  urlTitle: { type: Sequelize.STRING, validate : { isUrl: true }},
  content: { type: Sequelize.TEXT },
  date: { type: Sequelize.DATE, validate : {isDate: true}},
  status: { type: Sequelize.BOOLEAN }
  });

var User = db.define('user', {
  name: { type: Sequelize.STRING},
  email: { type: Sequelize.STRING, validate : { isEmail : true}}
});

db.sync( { force: true})
  .then(function () {
    console.log('we added tables to the db');
  }).catch(function (err) {
    console.error(err);
  })


