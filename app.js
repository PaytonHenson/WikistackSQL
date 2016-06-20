var express = require('express');
var morgan = require('morgan');
var path = require('path');
var swig = require('swig');
var bodyParser = require('body-parser');
var wikiRouter = require('./routes/wiki');
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

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
