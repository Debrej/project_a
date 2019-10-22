module.exports = function(sequelize, Sequelize, User, Availability) {

    const User_Assignment = sequelize.define('user_assignment', {
        // attributes
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });

    User.hasMany(User_Assignment, { foreignKey: 'user_id' });
    Availability.hasMany(User_Assignment, { foreignKey: 'availability_id' });

    return User_Assignment;
};