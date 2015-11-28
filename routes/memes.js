var express = require('express');
var router = express.Router();
var memes = require('../public/data/memes.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('memes', {title: 'Teh Memes', memes: memes});
});

module.exports = router;
