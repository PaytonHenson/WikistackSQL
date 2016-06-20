var express = require('express');
var morgan = require('morgan');
var path = require('path');
var swig = require('swig');
var bodyParser = require('body-parser');
var routes = require('./routes/');

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

app.use('/', routes);

var server = app.listen(3000);
