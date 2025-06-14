module.exports = app => {
    const controller = require('../controllers/category.controller');
    const router = require('express').Router();

    router.post('/', controller.create);
    router.get('/', controller.findAll);
    app.use('/api/categories', router);
};