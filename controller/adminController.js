const User = require("../models/user");
const { Item, calculateEndedDate, calculateTimeLeft } = require("../models/item");
const Bid = require("../models/bid");
const Category = require("../models/category");
const mongoose = require('mongoose');

const getHeaderData = async function(){
    const totalUser = await User.countDocuments();
    const total = await Item.aggregate(
        [
            {
                $group:
                {
                    _id: null,
                    totalRevenue: {$sum: "$highestBid"},
                }
            }
        ]
    )
    const totalRevenue = total[0].totalRevenue;
    const totalItems = await Item.countDocuments();
    const totalBiddingItems = await Item.where({ isListing: true }).countDocuments();

    return {
        totalUser,
        totalRevenue,
        totalItems,
        totalBiddingItems,
    }
}

// get user data for user table
// most post - most buy - money spent - most bid
const getAllUserData = async function(allUserData){
    const users = await User.find({});

    let money = null;

    for(let user of users){
        let userData = {
            numberOfPost: 0,
            numberOfItem: 0,
            moneySpent: 0,
            numberOfBid: 0,
        }

        userData.numberOfPost = await Item.where({ owner: user._id }).countDocuments();
        userData.numberOfItem = await Item.where({ winner: user._id }).countDocuments();

        money = await Item.aggregate(   
            [
                {
                    $match: { winner: new mongoose.Types.ObjectId(user._id) }
                },
                {
                    $group:
                    {
                        _id: null,
                        totalRevenue: {$sum: "$highestBid"},
                    }
                }
            ]
        )

        if(money.length > 0){  // item has been sold
            userData.moneySpent = money[0].totalRevenue;
        }
        else{
            userData.moneySpent = 0;
        }

        userData.numberOfBid = await Bid.where({ bidder: user._id }).countDocuments();

        allUserData.push(userData);
    }

    return allUserData;
}

// get item data for item table
// most bid - highest bid - starting bid - time left
const getAllItemData = async function(allItemData){
    const items = await Item.find({});

    for(let item of items){
        let itemData = {
            numberOfBid: 0,
            highestBid: 0,
            startingBid: 0,
            timeLeft: {
                day: 0,
                hour: 0,
                minute: 0,
                second: 0,
            }
        }

        itemData.numberOfBid = await Bid.where({ product: item._id }).countDocuments();
        itemData.highestBid = item.highestBid;
        itemData.startingBid = item.startingBid;

        calculateTimeLeft(item);

        itemData.timeLeft.day = item.timeLeft.day;
        itemData.timeLeft.hour = item.timeLeft.hour;
        itemData.timeLeft.minute = item.timeLeft.minute;
        itemData.timeLeft.second = item.timeLeft.second;

        if(item.timeLeft.second >= 0 && itemData.timeLeft.minute >= 0 && itemData.timeLeft.hour >= 0 && itemData.timeLeft.day >= 0){
            itemData.timeLeft.day = item.timeLeft.day;
            itemData.timeLeft.hour = item.timeLeft.hour;
            itemData.timeLeft.minute = item.timeLeft.minute;
            itemData.timeLeft.second = item.timeLeft.second;
        }
        else{
            itemData.timeLeft.day = 0;
            itemData.timeLeft.hour = 0;
            itemData.timeLeft.minute = 0;
            itemData.timeLeft.second = 0;
        }

        allItemData.push(itemData);
    }

    return allItemData;
}

module.exports.adminPage = async function(req, res){
    try{
        // Run all three tasks concurrently
        const [headerData, allUserData, allItemData] = await Promise.all([
            getHeaderData(),
            getAllUserData([]),
            getAllItemData([]),
        ]);

        const { totalUser, totalRevenue, totalItems, totalBiddingItems } = headerData;

        // Proceed with the rest of your code once all tasks are finished
        console.log("header data ", headerData);
        console.log("get all user ", allUserData);
        console.log("get all item ", allItemData);

        res.render("admin/admin", {
            totalUser,
            totalRevenue,
            totalItems,
            totalBiddingItems,
            allUserData,
            allItemData,
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({ err });
    }
}

module.exports.revenueByYear = async function(req, res){
    try{
        const year = req.params.year;
        const items = await Item.find({});
        const revenueByYear = {
            month_1: 0,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: 0,
        }

        items.forEach(function(item){
            if(calculateEndedDate(item).getFullYear() === parseInt(year)){
                console.log("items ", calculateEndedDate(item).getFullYear());
                switch(calculateEndedDate(item).getMonth()){
                    case 1:
                        revenueByYear.month_1 += parseInt(item.highestBid);
                        break;
                    case 2:
                        revenueByYear.month_2 += parseInt(item.highestBid);
                        break;
                    case 3:
                        revenueByYear.month_3 += parseInt(item.highestBid);
                        break;
                    case 4:
                        revenueByYear.month_4 += parseInt(item.highestBid);
                        break;
                    case 5:
                        revenueByYear.month_5 += parseInt(item.highestBid);
                        break;
                    case 6:
                        revenueByYear.month_6 += parseInt(item.highestBid);
                        break;
                    case 7:
                        revenueByYear.month_7 += parseInt(item.highestBid);
                        break;
                    case 8:
                        revenueByYear.month_8 += parseInt(item.highestBid);
                        break;
                    case 9:
                        revenueByYear.month_9 += parseInt(item.highestBid);
                        break;
                    case 10:
                        revenueByYear.month_10 += parseInt(item.highestBid);
                        break;
                    case 11:
                        revenueByYear.month_11 += parseInt(item.highestBid);
                        break;
                    case 12:
                        revenueByYear.month_12 += parseInt(item.highestBid);
                        break;
                }
            }
        });

        res.status(200).json({revenueByYear});
    }
    catch(err){
        console.log(err);
        res.status(400).json({ err });
    }
}

module.exports.revenueByCategory = async function(req, res){
    
}
