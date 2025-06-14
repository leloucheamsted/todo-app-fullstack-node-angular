const db = require('../models');
const Task = db.Task;
const Category = db.Category;
const Tag = db.Tag;

exports.create = async (req, res) => {
    try {
        const {
            title,
            description,
            created_at,
            updated_at,
            categoryId,
            tagIds = []
        } = req.body;

        if (categoryId) {
            const category = await Category.findByPk(categoryId);
            if (!category) return res.status(404).json({ message: 'Categorie not found' });
        }

        const task = await Task.create({
            title,
            description,
            created_at: created_at || new Date(),
            updated_at: updated_at || new Date(),
            categoryId
        });

        if (tagIds.length > 0) {
            const tags = await Tag.findAll({ where: { id: tagIds } });
            await task.setTags(tags);
        }

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: [
                { model: Category, attributes: ['id', 'name'] },
                { model: Tag, attributes: ['id', 'name'], through: { attributes: [] } }
            ]
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, {
            include: [
                { model: Category, attributes: ['id', 'name'] },
                { model: Tag, attributes: ['id', 'name'], through: { attributes: [] } }
            ]
        });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const {
            title,
            description,
            updated_at,
            categoryId,
            tagIds = []
        } = req.body;

        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: 'Taks not found' });

        await task.update({
            title,
            description,
            updated_at: updated_at || new Date(),
            categoryId
        });

        if (tagIds.length > 0) {
            const tags = await Tag.findAll({ where: { id: tagIds } });
            await task.setTags(tags);
        } else {
            await task.setTags([]);
        }

        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: 'Taks not found' });

        await task.destroy();
        res.json({ message: 'Task delete with success' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
