var ObjectId = require('mongodb').ObjectId;
var Program = require('../models/programModel');



// Renderovanje stranice o nama
exports.program_details_get = function (req, res) {
    var slug = req.params.slug;
    Program.find({'slug': slug }, function (err, result) {

        res.render('programdetails', {
            title: 'Add New item',
            data: result,
            user: req.user

        })
    })
};





// Admin panel
// renderovanje liste videa
exports.program_list_get = function(req, res) {
    Program.find({}, function (err, result) {
        res.render('backend/programlist', {
            title: 'Add New Video',
            data: result,
            user: req.user
        })
    });
};

// Display Item create form on GET. back
exports.program_create_get = function(req, res) {
    res.render('backend/createprogram', {
        title: 'Add New item',
        user: req.user

    })
};

exports.program_create_post = function(req, res) {
    var today = new Date();
    var program = {
        title: req.body.title,
        description: req.body.description,
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
                record.createdOn = today;

                record.save(function (err, items) {
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



// Handle Item delete on POST.
exports.program_delete_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Program.remove({"_id": o_id}, function(err, result) {
        res.redirect('/admin/program')
    })
};

// Display Item update form on GET. back
exports.program_update_get = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Program.find({ "_id": o_id  },function(err, result) {
        res.render('backend/updateprogram', {
            title: 'Add New item',
            data: result,
            user: req.user
        })
    });
};

// Handle Item update on POST. back
exports.program_update_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);

    var prog = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    };

    Program.findOneAndUpdate({ "_id": o_id  }, { $set : prog }, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        res.redirect('/admin');
    });

};