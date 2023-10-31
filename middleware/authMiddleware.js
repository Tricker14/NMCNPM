const jwt = require('jsonwebtoken');
const User = require('../models/user')

const requireAuth = function(req, res, next){
    const token = req.cookies.jwt;

    // check if jwt exists & verified
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, function(err, decodedToken){
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }
}

const checkUser = function(req, res, next){
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, async function(err, decodedToken){
            if(err){
                console.log(err.message);
                res.locals.user = null;
                req.body.user = null;
                next();
            }
            else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                req.body.user = user;
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        req.body.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };