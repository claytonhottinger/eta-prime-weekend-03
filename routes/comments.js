var express = require('express');
var router = express.Router();
var comments = require('../public/data/comments.json');
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/:id?', function(req, res, next) {
  if (req.params.id !== undefined) {
    var matchedComments = [];
    for (var i = 0; i < comments.length; i++) {
      if (comments[i].imageId === req.params.id) {
        matchedComments.push(comments[i]);
      }
    }
    res.send(matchedComments);
  } else {
    res.send([]);
  }
});

router.post('/', function(req, res, next) {

});

module.exports = router;
