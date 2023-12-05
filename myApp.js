let express = require('express');
let path = require('path');

let app = express();

console.log(__dirname)

app.use('/public', express.static(path.join(__dirname,'/public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/json', function(req, res) {
  res.json({"message": "Hello json"});
})

module.exports = app;
