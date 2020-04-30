var ObjectId = require('mongodb').ObjectId;
var Program = require('../models/programModel');

// Front
// Detalji programa
exports.program_details_get = function (req, res) {
    var slug = req.params.slug;
    Program.find({'slug': slug }, function (err, result) {
        res.render('programdetails', {
            title: 'MAT Pilates',
            data: result,
            user: req.user
        })
    })
};

// Admin panel
// Lista programa GET
exports.program_list_get = function(req, res) {
    Program.find({}, function (err, result) {
        res.render('backend/programlist', {
            title: 'MAT Pilates',
            data: result,
            user: req.user
        })
    });
};

// Kreiranje programa GET
exports.program_create_get = function(req, res) {
    res.render('backend/createprogram', {
        title: 'MAT Pilates',
        user: req.user

    })
};

// Kreiranje programa POST
exports.program_create_post = function(req, res) {
    var today = new Date();
    var program = {
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        image: req.body.image
    };

    Program.findOne({
        title: program.title
    }, function (err, doc) {
        if (err) {
            res.status(500).send('error occured')
        } else {
            if (doc) {
                res.status(500).send('Program already exists')
            } else {

                var record = new Program();
                record.title = program.title;
                record.description = program.description;
                record.image = program.image;
                record.time = program.time;
                record.createdOn = today;

                record.save(function (err, prog) {
                    if (err) {
                        res.status(500).send('db error')
                    } else {
                        res.redirect('/admin/program')
                    }
                })
            }
        }
    })
};

// Brisanje programa POST.
exports.program_delete_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Program.remove({"_id": o_id}, function(err, result) {
        res.redirect('/admin/program')
    })
};

// Update program GET
exports.program_update_get = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Program.find({ "_id": o_id  },function(err, result) {
        res.render('backend/updateprogram', {
            title: 'MAT Pilates',
            data: result,
            user: req.user
        })
    });
};

// Program update POST
exports.program_update_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);

    var prog = {
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        image: req.body.image
    };

    Program.findOneAndUpdate({ "_id": o_id  }, { $set : prog }, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        res.redirect('/admin/program');
    });

};