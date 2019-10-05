module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
        park: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    // Add a belongsTo association to Authors here

    Post.associate = function (models) {
        models.Post.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Post;
};
