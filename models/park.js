module.exports = function (sequelize, DataTypes) {
    var Park = sequelize.define('Post', {
        park: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        parkId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    // Add a belongsTo association to user here

    Park.associate = function (models) {
        models.Post.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Park;
};