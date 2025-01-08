// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var comments = require('./comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Get comments
app.get('/api/comments', function(req, res) {
  res.json(comments);
});

// Add comments
app.post('/api/comments', function(req, res) {
  var comment = {
    id: Date.now(),
    author: req.body.author,
    text: req.body.text
  };
    comments.push(comment);
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.log(err);
      }
    });
});