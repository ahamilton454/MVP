const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const s3urlSchema = new mongoose.Schema({
  fname: String,
  storageURL: String
});

const s3url = mongoose.model('s3url', s3urlSchema, "s3url");

const save = (fileName, storageURL) => {
  return new Promise((res, rej) => {
    const data = new s3url({ fname: fileName, storageURL: storageURL});
    res(data.save());
  })
}

const getFileNames = () => {
  return new Promise((res, rej) => {
    s3url.find({}, '-_id fname', (err, value) => {
      res(value.map((dict) => {
        return dict["fname"];
      }));
    });
  })
}

const getFile = (filename) => {
  return new Promise((res, rej) => {
    s3url.find({"fname": filename}, (err, value) => {
      if (err) {
        rej("Failed to find file");
      }
      console.log("Value", value[0].storageURL);
      res(value[0].storageURL);
    })
  })
}

module.exports.save = save;
module.exports.getFileNames = getFileNames;
module.exports.getFile = getFile;