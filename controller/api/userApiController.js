const User = require("../../models/user");
const fs = require('fs');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

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

module.exports.delete_user = async function (req, res) {
    const id = req.params._id;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ message: `cannot find user with id ${id}` });
      }
      await user.remove();
      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
    }
};
  
module.exports.profile = async function(req, res){
    const id = req.params._id;
    let isChangeImage = false;
    try{
      console.log('body', req.body);
      let day = req.body.day;
      let month = req.body.month;
      let year = req.body.year;
      console.log(day, month, year);
  
      let { name, phone, gender } = req.body;
      let image = null;
      if(req.file){
        image = req.file.filename;
        isChangeImage = true;
      }

      const user = await User.findById(id);
      if(user.name && name === "null"){
        name = user.name;
      }
      if(user.phone && phone === "null"){
        phone = user.phone;
      }
      if(user.gender && gender === "null"){
        gender = user.gender;
      }
      if(user.birthday.day && day === "null"){
        day = user.birthday.day;
      }
      if(user.birthday.month && month === "null"){
        month = user.birthday.month;
      }
      if(user.birthday.year && year === "null"){
        year = user.birthday.year;
      }
      if(user.image && image === null){
        image = user.image;
      }

      console.log(day, month, year);
      if(day === "null"){
        day = null;
      }
      if(month === "null"){
        month = null;
      }
      if(year === "null"){
        year = null;
      }
      let birthday = { day, month, year };
  
      try{
        if(image && isChangeImage){  // only upload image to cloud only image is not null
          // store image into cloud     
          let fileBuffer = fs.readFileSync(req.file.path);
          console.log("buffer ", fileBuffer);
          const params = {
            Bucket: bucketName,
            Key: image,
            Body: fileBuffer,
            ContentType: req.file.mimetype,
          }
  
          const command = new PutObjectCommand(params);
          await s3.send(command);
          // store image to cloud
          console.log("execute successfully");
        }
        else{
          console.log("execute fail");
        }
      }
      catch(err){
        console.log('Error during S3 upload:', err);
        res.status(500).json({ error: err });
      }
  
      const updatedAttribute = { name, phone, gender, birthday, image };
  
      await User.findByIdAndUpdate(id, updatedAttribute, {new: true});
      // res.status(200).json({ userUpdate });
      res.redirect(`/webid/profile/${id}`);
    }
    catch(err){
      console.log(err + "fuck");
      res.status(400).json({ err });
    }
}
  
module.exports.addToFavorite = async function(req, res){
  const id = req.params.itemId
  theUser = await User.findById(res.locals.user._id)
  theUser.favorites.push(id)
  theUser.save();
  res.status(200).send("OK")
}

module.exports.removeFromFavorite = async function(req, res){
  const id = req.params.itemId
  theUser = await User.findById(res.locals.user._id)
  const idx = theUser.favorites.indexOf(id)
  theUser.favorites.splice(idx, 1);
  theUser.save();
  res.status(200).send("OK")
}
