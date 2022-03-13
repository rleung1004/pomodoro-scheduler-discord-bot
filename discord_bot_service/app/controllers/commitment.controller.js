const Commitment = require("../models/commitment.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const commitment = new Commitment({
        title: req.body.title,
        date: req.body.date,
        info: req.body.info
    });
    Commitment.create(commitment, (err, res) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occured while creating the commitment."
            });
        } else {
            res.send(data);
        }    
    });
};

exports.getAll = (req, res) => {
    const title = req.query.title;
    Commitment.getAll(title, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occured while retrieving the commitments."
            });
        } else {
            res.send(data);
        }   
    })
};

