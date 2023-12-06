let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
const res = require('express/lib/response');

require('dotenv').config()

let app = express();

app.use('/public', express.static(path.join(__dirname,'/public')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Use body-parser to parse POST requests
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/json', function(req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    message = message.toUpperCase();
  }
  
  res.json({"message": message});
});

app.get('/now', function(req, res, next) {
  // Middleware
  req.time = (new Date()).toString();
  next();
}, function(req, res) {
  // Request handler
  res.json({'time': req.time});
});

app.get('/:word/echo', function(req, res) {
  res.json({'echo': req.params.word})
})

// app.get('/name', function(req, res) {
//   let name = `${req.query.first} ${req.query.last}`;
//   res.json({'name': name})
// })

app.route('/name').get(function(req, res) {
  let name = `${req.query.first} ${req.query.last}`;
  res.json({'name': name})
}).post(function(req, res) {
  let name = `${req.body.first} ${req.body.last}`;
  res.json({'name': name});
})

module.exports = app;
