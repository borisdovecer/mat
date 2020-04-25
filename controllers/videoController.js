var ObjectId = require('mongodb').ObjectId;
var Video = require('../models/videoModel');
var request = require("request");

// Front
// renderovanje liste videa
exports.video_list = function(req, res) {
    var find = { premium: false };
    var user = req.user;
    var hidden = 'hidden';

    if(user && user.role === 'premium'){
        hidden = '';
    }

    Video.find( {}, function(err, result) {
        res.render('videolist', {
            title: 'Add New item',
            data: result,
            hidden: hidden,
            user: req.user
        })
    }).sort( {"_id": -1} );
};

exports.video_details = function(req, res) {
    var o_id = new ObjectId(req.params.id);

    Video.find( {"_id": o_id}, function(err, result) {
        res.render('videodetails', {
            title: 'Add New item',
            data: result,
            user: req.user
        })
    });
};



// Admin panel
// renderovanje liste videa
exports.video_list_get = function(req, res) {
    Video.find({}, function (err, result) {
    res.render('backend/videolist', {
        title: 'Add New Video',
        data: result,
        user: req.user
    })
    });
};

// Display Item create form on GET. back
exports.video_create_get = function(req, res) {
    res.render('backend/createvideo', {
        title: 'Add New item',
        user: req.user

    })
};

exports.video_create_post = function(req, res) {
    var url = "https://vimeo.com/api/v2/video/" + req.body.url + ".json";

    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body[0].thumbnail_large); // Print the json response

    var video = {
        title: req.body.title,
        description: req.body.description,
        url: "https://vimeo.com/" + req.body.url,
        image: body[0].thumbnail_large,
        premium: req.body.premium
    };

            Video.findOne({
                title: video.title
            }, function (err, doc) {
                if (err) {
                    res.status(500).send('error occured')
                } else {
                    if (doc) {
                        res.status(500).send('Video already exists')
                    } else {

                        var record = new Video();
                        record.title = video.title;
                        record.description = video.description;
                        record.url = video.url;
                        record.image = video.image;
                        record.premium = video.premium;

                        record.save(function (err, video) {
                            if (err) {
                                res.status(500).send('db error')
                            } else {
                                res.redirect('/admin')
                            }
                        })

                    }
                }
            })
        }
    });
};


// Handle Item delete on POST.
exports.video_delete_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Video.remove({"_id": o_id}, function(err, result) {
        res.redirect('/admin')
    })
};

// Display Item update form on GET. back
exports.video_update_get = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Video.find({ "_id": o_id  },function(err, result) {
        res.render('backend/updatevideo', {
            title: 'Add New item',
            data: result,
            user: req.user
        })
    });
};

// Handle Item update on POST. back
exports.video_update_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);

    var video = {
        title: req.body.title,
        description: req.body.description,
        url: "https://vimeo.com/" + req.body.url,
    //    image: body[0].thumbnail_large,
        premium: req.body.premium
    };

    Video.findOneAndUpdate({ "_id": o_id  }, { $set : video }, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        res.redirect('/admin');
    });

};
