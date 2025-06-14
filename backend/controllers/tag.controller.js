const db = require('../models');
const Tag = db.Tag;

exports.create = async (req, res) => {
    try {
        const tag = await Tag.create({ name: req.body.name });
        res.status(201).json(tag);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

