require('dotenv').config()

let express = require('express');
let path = require('path');

let app = express();

app.use('/public', express.static(path.join(__dirname,'/public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/json', function(req, res) {
  let message = "Hello json";
  console.log(message);
  console.log(process.env.MESSAGE_STYLE)
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    message = message.toUpperCase();
  }
  
  res.json({"message": message});
})

module.exports = app;
