var ObjectId = require('mongodb').ObjectId;
var Ponuda = require('../models/ponudaModel');
var moment = require('moment');
var slug = require('slug');


// front
// Ponuda details
exports.ponuda_detail = function(req, res) {
    var slug = req.params.slug;
    Ponuda.find({"slug": slug}, function(err, result) {
        console.log(result);
        if (err) {
            console.log(err);
        } else  {
            res.render('ponudadetails', {
                title: 'MAT pilates',
                data: result,
                moment: moment,
                user: req.user
            })
        }
    })
};


// Admin panel
// renderovanje liste ponuda
exports.ponuda_list_get = function(req, res) {
    Ponuda.find({}, function (err, result) {
        res.render('backend/ponudalist', {
            title: 'MAT pilates',
            data: result,
            user: req.user
        })
    });
};

// Kreiranje ponuda GET
exports.ponuda_create_get = function(req, res) {
    res.render('backend/createponuda', {
        title: 'MAT pilates',
        user: req.user
    })
};

// Kreiranje ponude POST
exports.ponuda_create_post = function(req, res) {
    var ponuda = {
        title: req.body.title,
        trening: req.body.trening,
        program: req.body.program,
        termin: req.body.termin,
        description: req.body.description,
        slug:slug(req.body.title, {lower: true})
    };
    var t1 = ponuda.trening.split('.');
    var t2 = ponuda.program.split('.');
    var t3 = ponuda.termin.split('.');

    Ponuda.findOne({
        title: ponuda.title
    }, function (err, doc) {
        if (err) {
            res.status(500).send('error occured')
        } else {
            if (doc) {
                res.status(500).send('Ponuda already exists')
            } else {

                var record = new Ponuda();
                record.title = ponuda.title;
                record.description = ponuda.description;
                record.trening = t1;
                record.program = t2;
                record.termin = t3;
                record.slug = "slug";

                record.save(function (err, ponuda) {
                    if (err) {
                        res.status(500).send('db error')
                    } else {
                        res.redirect('/admin/ponuda')
                    }
                })
            }
        }
    })

};

// Update ponude GET
exports.ponuda_update_get = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Ponuda.find({ "_id": o_id  },function(err, result) {
        res.render('backend/updateponuda', {
            title: 'MAT pilates',
            data: result,
            user: req.user
        })
    });
};

// Update ponude POST
exports.ponuda_update_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var ponuda = {
        title: req.body.title,
        description: req.body.description,
        trening: req.body.trening.split('.'),
        program: req.body.program.split('.'),
        termin: req.body.termin.split('.'),
        slug:slug(req.body.title, {lower: true})
    };

    Ponuda.findOneAndUpdate({ "_id": o_id  }, { $set : ponuda }, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        res.redirect('/admin/ponuda');
    });

};

// Brisanje ponude POST
exports.ponuda_delete_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Ponuda.remove({"_id": o_id}, function(err, result) {
        res.redirect('/admin/ponuda')
    })
};
