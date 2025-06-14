module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('tag', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        timestamps: false
    });

    return Tag;
};