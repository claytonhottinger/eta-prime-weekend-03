var express = require('express');
var router = express.Router();
var comments = require('../public/data/comments.json');
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/:id?', function(req, res, next) {
  if (req.params.id !== undefined) {
    console.log(req.params.id);
    var matchedComments = [];
    for (var i = 0; i < comments.length; i++) {
      if (comments[i].imageId === req.params.id) {
        matchedComments.push(comments[i]);
      }
    }
    console.log(matchedComments);
    res.send(matchedComments);
  } else {
    res.send([]);
  }
});

router.post('/', function(req, res, next) {
  var newComment = {imageId: req.body.imageId, message: req.body.message};
  comments.push(newComment);
  var string = JSON.stringify(comments);
  var filePath = path.join(__dirname, '../public/data/comments.json');
  fs.writeFile(filePath, string, function(err) {
    if (err) {
      // if there is an error, "next" middleware will handle it.
      // Next in our case is the error handler in app.js
      next(err);
    } else {
      // it's all good! Send the object back.
      res.send(newComment);
    }
  });
});

module.exports = router;
