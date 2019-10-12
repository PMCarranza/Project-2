module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate:
            {
                len: [1, 500]
            }
        },
    });

    // Add a belongsTo association to Authors here

    Post.associate = function (models) {
        models.Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        models.Post.belongsTo(models.Park, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Post;
};