const Category = require("../../models/category");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
});

async function deleteImage(image){
  // delete image from cloud
  const params = {
    Bucket: bucketName,
    Key: image
  }
  const command = new DeleteObjectCommand(params);
  await s3.send(command);
  // delete image from cloud
}

module.exports.category_post = async function (req, res) {
  console.log("body, ", req.body);
  console.log("file ", req.file);
  const { name } = req.body;
  const image  = req.file.filename;
  
  // store image into cloud     
  let fileBuffer = fs.readFileSync(req.file.path);
  const params = {
    Bucket: bucketName,
    Key: image,
    Body: fileBuffer,
    ContentType: req.file.mimetype,
  }

  const command = new PutObjectCommand(params);
  await s3.send(command);
  // store image to cloud

  try {
    const category = await Category.create({ name, image });
    res.status(201).json({ category });
    // res.redirect('/webid/categories');
  } catch (err) {
    const error = 'This category is already exist!';
    deleteImage(image);
    console.log(error);
    res.status(400).json({ error });
  }
};
