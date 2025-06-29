module.exports = app => {
    const controller = require('../controllers/task.controller');
    const router = require('express').Router();

    router.get('/init', controller.initData);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findOne);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);


    app.use('/api/tasks', router);
};