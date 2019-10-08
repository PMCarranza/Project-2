module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
        cat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate:
            {
                len: [1, 500]
            }},
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
