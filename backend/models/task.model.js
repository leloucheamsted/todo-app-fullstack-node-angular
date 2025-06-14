module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('task', {
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        timestamps: false
    });

    return Task;
};