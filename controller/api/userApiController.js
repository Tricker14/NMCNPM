const User = require("../../models/user");

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
    try{
      console.log('body', req.body);
      let day = req.body.day;
      let month = req.body.month;
      let year = req.body.year;
  
      let { name, phone, gender } = req.body;
      let image = null;
      if(req.file){
        image = req.file.filename;
      }
      const user = await User.findById(id);
      if(user.name && !name){
        name = user.name;
      }
      if(user.phone && !phone){
        phone = user.phone;
      }
      if(user.gender && !gender){
        gender = user.gender;
      }
      if(user.birthday.day && !day){
        day = user.birthday.day;
      }
      if(user.birthday.month && !month){
        month = user.birthday.month;
      }
      if(user.birthday.year && !year){
        year = user.birthday.year;
      }
      if(user.image && !image){
        image = user.image;
      }
  
      let birthday = { day, month, year };
  
      const updatedAttribute = { name, phone, gender, birthday, image };
  
      const userUpdate = await User.findByIdAndUpdate(id, updatedAttribute, {new: true});
      // res.status(200).json({ userUpdate });
      res.redirect(`/webid/profile/${id}`);
    }
    catch(err){
      console.log(err);
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
