var ObjectId = require('mongodb').ObjectId;
var User = require('../models/User');
var moment = require('moment');



// Display detail page for a specific Author.
exports.user_detail = function(req, res) {
    var user = req.user.username;
    User.find({"username": user}, function(err, result) {
        if (err) {
            console.log(err);
        } else  {
            res.render('profile', {
                title: 'MAT pilates',
                data: result,
                moment: moment,
                user: req.user
            })
        }
    })
};


// Admin panel
// renderovanje liste usera
exports.user_list_get = function(req, res) {
    var today = new Date();
    var nextmonth = new Date(today.setMonth(today.getMonth() + 1));

    User.find({}, function (err, result) {

        res.render('backend/userlist', {
            title: 'Add New Video',
            data: result,
            moment: moment,
            user: req.user
        })
    });
};

exports.user_update_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var role = req.body.role;
    var today = new Date();
    var nextmonth = today;
    if(role === 'premium'){
        nextmonth = new Date(today.setMonth(today.getMonth() + 1));
    }

    var data = {
        role: role,
        expireOn: nextmonth
    };


    User.findOneAndUpdate({ "_id": o_id  }, { $set : data }, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        res.redirect('/admin/users');
    });
};

// Display detail page for a specific Author.
exports.premiumExpire = function(req, res) {
    var now = new Date();
    console.log(now);
    User.update({ "role":"premium", "expireOn": { $lte: now }  }, { $set :  { "role": "regular"} }, {multi: true}, function(err, doc) {
        console.log(doc);
    });
};
