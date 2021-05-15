const express = require('express');
const app = express();
const port = 3000;

var cors = require('cors');
var multer = require('multer');

var awsUploader = require('./awsUploader.js');

var db = require('../database/db.js');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, 'audiofile.wav')
  }
})

var upload = multer({ storage: storage })

app.use(cors());

app.get('/file', (req, res) => {

  db.getFile(req.query.fname)
    .then((url) => {
      console.log("Get /file URL: ", url);
      res.send(url);
    })

})

app.get('/uploads', (req, res) => {
  db.getFileNames()
    .then((fnames) => {
      res.send(fnames);
    });

})

app.post('/uploads', upload.single('audiofile'), (req, res) => {
  awsUploader.uploadFile("audiofile.wav", req.file.originalname)
    .then((s3url) => {
      console.log(s3url);
      db.save(req.file.originalname, s3url)
      .then((data) => {
        console.log(data);
      })
    })
    .catch((error) => {
      throw error;
    });

  res.send('POST Uploads')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})