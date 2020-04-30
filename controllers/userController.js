var ObjectId = require('mongodb').ObjectId;
var User = require('../models/User');
var moment = require('moment');

// Front
// Profilna stranica
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
// renderovanje liste korisnika
exports.user_list_get = function(req, res) {
    User.find({}, function (err, result) {
        res.render('backend/userlist', {
            title: 'Add New Video',
            data: result,
            moment: moment,
            user: req.user
        })
    });
};

// Detalji korisnika GET
exports.user_detail_get = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    User.find({"_id": o_id}, function(err, result) {
        if (err) {
            console.log(err);
        } else  {
            res.render('backend/userdetails', {
                title: 'MAT pilates',
                data: result,
                moment: moment,
                user: req.user
            })
        }
    })
};

// Dodavanje Premiuma korisnicima POST
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

// Dodavanje clanarine i broja termina korisnicima POST
exports.user_edit_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var clanarina = new Date(req.body.clanarina);
    var termini = req.body.termin;
    var newDate = new Date(clanarina.setHours(clanarina.getHours() + 12));

    var  data = {
            membershipExpireOn: newDate,
            brojTermina: termini
        };

    User.findOneAndUpdate({ "_id": o_id  }, { $set : data }, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        res.redirect('/admin/users/'+ o_id);
    });
};

// Dodavanje prisustva korisnicima POST
exports.user_prisustvo_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var datepick = new Date(req.body.datepick);
    var newDate = new Date(datepick.setHours(datepick.getHours() + 12));

    var data = {
        prisustvo: newDate
    };

    User.findOneAndUpdate({ "_id": o_id  }, { $push : data , $inc: {brojTermina:-1}}, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        res.redirect('/admin/users/'+ o_id);
    });
};

// Provera premiuma
exports.premiumExpire = function(req, res) {
    var now = new Date();
    User.update({ "role":"premium", "expireOn": { $lte: now }  }, { $set :  { "role": "regular"} }, {multi: true}, function(err, doc) {
        console.log(doc);
    });
};
