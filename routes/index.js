var express = require('express');
var router = express.Router();
var memes = require('../public/data/memes.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('memes', {title: 'Memification', memes: memes});
});

module.exports = router;
