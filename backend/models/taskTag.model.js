module.exports = (sequelize, DataTypes) => {
    const TaskTag = sequelize.define('task_tag', {}, {
        timestamps: false
    });

    return TaskTag;
};