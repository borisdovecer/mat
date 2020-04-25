var express = require('express');
var router = express.Router();

var videoController = require('../../controllers/videoController');
var userController = require('../../controllers/userController');
var programController = require('../../controllers/programController');


var isAdmin = function (req, res, next) {
    userController.premiumExpire();
    if (req.isAuthenticated()) {
        var role = req.user.role;
        if(role === 'admin'){
            next()
        }else {
            res.redirect('/');
        }

    } else {
        res.redirect('/login')
    }
};

/* CRUD za Video */
router.get('/', isAdmin, videoController.video_list_get);
router.get('/videos/create', isAdmin, videoController.video_create_get);
router.post('/videos/create',isAdmin, videoController.video_create_post);
router.get('/videos/:id', isAdmin,videoController.video_update_get);
router.post('/videos/:id', isAdmin, videoController.video_update_post);
router.post('/videos/delete/:id', isAdmin, videoController.video_delete_post);

router.get('/users', isAdmin, userController.user_list_get);
router.post('/users/update/:id',isAdmin, userController.user_update_post);

router.get('/program',isAdmin, programController.program_list_get);
router.get('/program/create', isAdmin,programController.program_create_get);
router.post('/program/create', isAdmin,programController.program_create_post);
router.get('/program/:id', isAdmin,programController.program_update_get);
router.post('/program/:id',isAdmin, programController.program_update_post);

module.exports = router;
