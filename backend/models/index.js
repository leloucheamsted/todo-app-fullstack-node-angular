const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Task = require('./task.model')(sequelize, Sequelize);
db.Category = require('./category.model')(sequelize, Sequelize);
db.Tag = require('./tag.model')(sequelize, Sequelize);
db.TaskTag = require('./taskTag.model')(sequelize, Sequelize);

db.Category.hasMany(db.Task);
db.Task.belongsTo(db.Category);

db.Task.belongsToMany(db.Tag, { through: db.TaskTag });
db.Tag.belongsToMany(db.Task, { through: db.TaskTag });

module.exports = db;