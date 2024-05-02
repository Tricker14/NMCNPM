const User = require("../models/user");
const { Item } = require("../models/item");

module.exports.adminPage = async function(req, res){
    try{
        const totalUser = await User.countDocuments();
        const total = await Item.aggregate(
            [
                {
                    $group:
                    {
                        _id: null,
                        count: {$sum: "$highestBid"}
                    }
                }
            ]
        )
        const totalRevenue = total[0].count;
        console.log("total ", total);
        res.render("admin/admin", {
            totalUser,
            totalRevenue,
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({ err });
    }
}
