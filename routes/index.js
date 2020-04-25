var express = require('express');
var router = express.Router();
var User = require('../models/User');

var indexController = require('../controllers/indexController');
var videoController = require('../controllers/videoController');
var programContoller = require('../controllers/programController');
var userController = require('../controllers/userController');



var loggedin = function (req, res, next) {
    userController.premiumExpire();
    if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
};


// Index rute
router.get('/', indexController.getIndex);
router.get('/login', indexController.getLogin);
router.get('/signup', indexController.getSignup);
router.get('/logout',loggedin, indexController.getLogout);
router.get('/about', indexController.about_get);

router.get('/videos', loggedin, videoController.video_list);
router.get('/videos/:id', loggedin, videoController.video_details);

router.get('/program/:slug', programContoller.program_details_get);

router.get('/profile',loggedin, userController.user_detail);


module.exports = router;