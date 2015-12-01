var express = require('express');
var router = express.Router();
var memes = require('../public/data/memes.json');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
//define storage object that multer interprets to create the right filepath
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'public/images/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
//create multer object with storage as the config
var upload = multer({storage: storage});

/** Post routing for uploading new memes.
  'upload.single' is multer doing it's thing to write the file to the folder
  specified in 'storage.' The following function writes the meme info to
  the memes.json file

*/
router.post('/', upload.single('file'), function(req, res, next) {
  var newUpload = {id: req.body.id,
  url: '/images/' + req.file.filename};
  if (newUpload.id && newUpload.url) {
    memes.push(newUpload);
    var string = JSON.stringify(memes, null, 2);
    var filePath = path.join(__dirname, '../public/data/memes.json');
    fs.writeFile(filePath, string, function(err) {
      if (err) {
        // if there is an error, "next" middleware will handle it.
        // Next in our case is the error handler in app.js
        next(err);
      } else {
        // it's all good! Send the object back.
        res.send(newUpload);
      }
    });
  } else {
    res.status(400);
    res.write(
      'Cannot write sent data. Must be an object with properties "imageId" and "message"');
    res.send();
  }
});

module.exports = router;
