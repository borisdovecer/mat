var ObjectId = require('mongodb').ObjectId;
var Video = require('../models/videoModel');
var request = require("request");

// Front
// renderovanje liste videa
exports.video_list = function(req, res) {
    var count = 0;
    var pages = 1;
    var current = 1;
    var limit = 15;
    var query = req.query;

    // Page Query
    if(query.page){
        current = query.page;
    }
    var skip = limit * (current-1);

    Video.find({}, function(err, result) {
        count = result.length;
        pages = parseInt((count / limit) + 0.9);
    });

    Video.find( {}, function(err, result) {
        res.render('videolist', {
            title: 'Mat Pilates',
            current: current,
            pages: pages,
            data: result,
            user: req.user
        })
    }).limit(limit).skip(skip).sort( {"_id": -1} );
};

// Detalji videa na frontu
exports.video_details = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Video.find( {"_id": o_id}, function(err, result) {
        res.render('videodetails', {
            title: 'Mat Pilates',

            data: result,
            user: req.user
        })
    });
};

// Admin panel
// renderovanje liste videa GET
exports.video_list_get = function(req, res) {
    Video.find({}, function (err, result) {
        res.render('backend/videolist', {
            title: 'Mat Pilates',
            data: result,
            user: req.user
        })
    });
};

// Kreiranje videa GET
exports.video_create_get = function(req, res) {
    res.render('backend/createvideo', {
        title: 'Mat Pilates',
        user: req.user
    })
};

// Kreiranje videa POST
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


// Brisanje videa POST
exports.video_delete_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Video.remove({"_id": o_id}, function(err, result) {
        res.redirect('/admin')
    })
};

// Update videa GET
exports.video_update_get = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Video.find({ "_id": o_id  },function(err, result) {
        res.render('backend/updatevideo', {
            title: 'Mat Pilates',
            data: result,
            user: req.user
        })
    });
};

// update videa POST
exports.video_update_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
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

            Video.findOneAndUpdate({"_id": o_id}, {$set: video}, {upsert: true}, function (err, doc) {
                if (err) return res.send(500, {error: err});
                res.redirect('/admin');
            });
            }
        }
    );
};
