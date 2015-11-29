var express = require('express');
var router = express.Router();
var memes = require('../public/data/memes.json');
var comments = require('../public/data/comments.json');

/* GET users listing. */
router.get('/:id?', function(req, res, next) {

  if (req.params.id !== undefined) {
    for (var i = 0; i < memes.length; i++) {
      if (memes[i].id == req.params.id) {
        res.render('onlyone', {title: 'Teh Memes', meme: memes[i]});
      }
    }
  } else {
    res.render('memes', {title: 'Teh Memes', memes: memes});
  }

});

module.exports = router;
