var express = require('express');
var router = express.Router();

var videoController = require('../../controllers/videoController');
var userController = require('../../controllers/userController');
var programController = require('../../controllers/programController');
var ponudaController = require('../../controllers/ponudaController');

// Admin provera
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

// Admin rute za video
router.get('/', isAdmin, videoController.video_list_get);
router.get('/videos/create', isAdmin, videoController.video_create_get);
router.post('/videos/create',isAdmin, videoController.video_create_post);
router.get('/videos/:id', isAdmin,videoController.video_update_get);
router.post('/videos/:id', isAdmin, videoController.video_update_post);
router.post('/videos/delete/:id', isAdmin, videoController.video_delete_post);

// Admin rute za usere
router.get('/users', isAdmin, userController.user_list_get);
router.get('/users/:id', isAdmin, userController.user_detail_get);
router.post('/users/update/:id',isAdmin, userController.user_update_post);
router.post('/users/edit/:id', isAdmin, userController.user_edit_post);
router.post('/users/prisustvo/:id', isAdmin, userController.user_prisustvo_post);

// Admin rute za program
router.get('/program',isAdmin, programController.program_list_get);
router.get('/program/create', isAdmin,programController.program_create_get);
router.post('/program/create', isAdmin,programController.program_create_post);
router.get('/program/:id', isAdmin,programController.program_update_get);
router.post('/program/:id',isAdmin, programController.program_update_post);
router.post('/program/delete/:id',isAdmin, programController.program_delete_post);

// Admin rute za ponude
router.get('/ponuda',isAdmin, ponudaController.ponuda_list_get);
router.get('/ponuda/create', isAdmin,ponudaController.ponuda_create_get);
router.post('/ponuda/create', isAdmin,ponudaController.ponuda_create_post);
router.get('/ponuda/:id', isAdmin,ponudaController.ponuda_update_get);
router.post('/ponuda/:id',isAdmin, ponudaController.ponuda_update_post);
router.post('/ponuda/delete/:id',isAdmin, ponudaController.ponuda_delete_post);

module.exports = router;
