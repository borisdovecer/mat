var User = require('../models/User');
var Program = require('../models/programModel');
var Ponuda = require('../models/ponudaModel');


// Renderovanje index stranice
module.exports.getIndex = function(req, res) {
    Program.find({}, function (err, prog) {
        Ponuda.find({}, function (err, ponuda) {
            res.render('index', {
                title: 'MAT Pilates',
                user: req.user,
                prog: prog,
                ponuda:ponuda
            });
        });
    });
};


// Renderovanje stranice o nama
module.exports.about_get = function (req, res) {
    res.render('about', {
        title: 'MAT Pilates',
        user: req.user
    });
};

// Renderovanje login stranice
module.exports.getLogin = function(req, res) {
    res.render('login',{
        user: req.user
    });

};

// Renderovanje signup stranice
module.exports.getSignup = function(req, res) {
    res.render('signup',{
        user: req.user
    });
};

// Logout
module.exports.getLogout = function(req, res) {
    req.logout();
    res.redirect('/');
};