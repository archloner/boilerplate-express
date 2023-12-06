require('dotenv').config()

let express = require('express');
let path = require('path');

let app = express();

app.use('/public', express.static(path.join(__dirname,'/public')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/json', function(req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    message = message.toUpperCase();
  }
  
  res.json({"message": message});
})

module.exports = app;
