var express = require('express');
var morgan = require('morgan');
var path = require('path');
var swig = require('swig');
var bodyParser = require('body-parser');
var wikiRouter = require('./routes/wiki');
var usersRouter = require('./routes/user');
var tagRouter = require('./routes/tagRouter');
var models = require('./models');

var app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));

//BodyParser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Swig setup
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);
app.use('/search', tagRouter);

models.User.sync( {force: true}) // { force: true }
.then(function () {
    return models.Page.sync( {force: true})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
