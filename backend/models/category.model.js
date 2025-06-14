module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        timestamps: false
    });

    return Category;
};