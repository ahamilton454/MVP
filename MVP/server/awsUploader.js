const fs =  require('fs');
const aws = require('aws-sdk');
const cred = require('./secrets.js');

const s3 = new aws.S3({
  accessKeyId: cred.data.id,
  secretAccessKey: cred.data.secret
});

const uploadFile = (fileNameInServer, fileNameInS3) => {
  return new Promise((res, rej) => {
    const fileContent = fs.readFileSync("./uploads/" + fileNameInServer);

    const params = {
      Bucket: cred.data.bucket_name,
      Key: fileNameInS3,
      Body: fileContent
    }

    s3.upload(params, (err, data) => {
      if (err) {
        rej('Failed to upload to S3');
      } else {
        res(data.Location);
      }
    })
  })

}

module.exports.uploadFile = uploadFile