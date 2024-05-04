const mongoose = require("mongoose");
const User = require("./user");
const Category = require("./category");
const Bid = require("./bid");
const { unlinkSync } = require("node:fs");
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

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an item name"],
  },
  description: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  startingBid: {
    type: Number,
    required: [true, "Please enter an item bid price"],
  },
  bidIncrement: {
    type: Number,
    required: [true, "Please enter an item bid increment"],
  },
  highestBid: {
    type: Number,
  },
  image: {
    type: String,
    required: [true, "Please choose an image"],
  },
  previewImages: [
    {
      type: String,
      required: [true, "Please choose an image"],
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  countdown: {
    day: {
      type: Number,
      required: [true, "Please choose day"],
    },
    hour: {
      type: Number,
      required: [true, "Please choose hour"],
    },
    minute: {
      type: Number,
      required: [true, "Please choose minute"],
    },
    second: {
      type: Number,
      required: [true, "Please choose second"],
    },
  },
  timeLeft: {
    day: {
      type: Number,
      default: null,
    },
    hour: {
      type: Number,
      default: null,
    },
    minute: {
      type: Number,
      default: null,
    },
    second: {
      type: Number,
      default: null,
    },
  },
  isListing: {
    type: Boolean,
    default: true,
  },
});

async function deleteMainImage(image) {
  console.log(image);

  try {
    // unlinkSync(`public/images/items-images/${image}`);

    // delete image from cloud
    const params = {
      Bucket: bucketName,
      Key: image
    }
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    // delete image from cloud

  } catch (err) {
    console.log("cannot delete image");
    console.log(err);
  }
}

async function deletePreviewImages(images) {
  for(let image of images) {
    try {
      // unlinkSync(`public/images/items-images/${image}`);

      // delete image from cloud
      const params = {
        Bucket: bucketName,
        Key: image
      }
      const command = new DeleteObjectCommand(params);
      await s3.send(command);
      // delete image from cloud
      
    } catch (err) {
      console.log("cannot delete image");
      console.log(err);
    }
  }
}

// clean up image when delete an item
// itemSchema.post("findOneAndDelete", async function (doc) {
//   deleteMainImage(doc.image);
//   deletePreviewImages(doc.previewImages);

// });

itemSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.findOne();
  if (doc) {
    await deleteMainImage(doc.image);
    await deletePreviewImages(doc.previewImages);

    console.log("start");
    await Bid.deleteMany({ product: doc._id });
    console.log("end");
  }
  next();
});

// delete item when the countdown over (just set isListing = false, not delete it literally)

const deleteItem = async function (id) {
  try {
    const item = await Item.findById(id);
    const highestBid = await Bid.find({ product: item })
      .sort({ price: -1 })
      .limit(1)
      .populate("bidder");
    let highestBidder = null;
    if (highestBid[0]) {
      highestBidder = highestBid[0].bidder;
    }

    const update = { winner: highestBidder, isListing: false };
    await Item.findByIdAndUpdate(id, update);
  } catch (err) {
    console.log(err);
  }
};

const countdownDeleteItem = function (item) {
  let chunkDay = 20;
  if(item.countdown.day > chunkDay){
    let day = item.countdown.day;  // reference
    while(day >= chunkDay){
      const time = chunkDay * 24 * 60 * 60 * 1000;

      setTimeout(function () {}, time);
      day -= 20;
    }
    const time =
    (day * 24 * 60 * 60 +
      item.countdown.hour * 60 * 60 +
      item.countdown.minute * 60 +
      item.countdown.second) *
    1000;

    setTimeout(async function () {
      await deleteItem(item._id);
    }, time);
  }
  else{
    const time =
    (item.countdown.day * 24 * 60 * 60 +
      item.countdown.hour * 60 * 60 +
      item.countdown.minute * 60 +
      item.countdown.second) *
    1000;

    setTimeout(async function () {
      await deleteItem(item._id);
    }, time);
  }
};

const calculateTimeLeft = function (item) {
  const currentTime = new Date();
  const endDate = new Date(item.createdDate); // Assuming createdDate is the auction start date

  // Calculate the target end time based on the provided countdown values
  endDate.setUTCDate(endDate.getUTCDate() + item.countdown.day);
  endDate.setUTCHours(endDate.getUTCHours() + item.countdown.hour);
  endDate.setUTCMinutes(endDate.getUTCMinutes() + item.countdown.minute);
  endDate.setUTCSeconds(endDate.getUTCSeconds() + item.countdown.second);

  // Calculate the time left
  const timeLeft = endDate - currentTime;

  // Convert time left to days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  item.timeLeft.day = days;
  item.timeLeft.hour = hours;
  item.timeLeft.minute = minutes;
  item.timeLeft.second = seconds;

  item.save();

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const calculateEndedDate = function(item){
  const endDate = new Date(item.createdDate); // Assuming createdDate is the auction start date

  // Calculate the target end time based on the provided countdown values
  endDate.setUTCDate(endDate.getUTCDate() + item.countdown.day);
  endDate.setUTCHours(endDate.getUTCHours() + item.countdown.hour);
  endDate.setUTCMinutes(endDate.getUTCMinutes() + item.countdown.minute);
  endDate.setUTCSeconds(endDate.getUTCSeconds() + item.countdown.second);

  return endDate;
}

const calculateTimeOnChart = function(item){
  const currentTime = new Date();
  const createdDate = new Date(item.createdDate);

  return currentTime - createdDate;
}

const Item = mongoose.model("item", itemSchema);

module.exports = { Item, countdownDeleteItem, calculateTimeLeft, calculateEndedDate, calculateTimeOnChart };
