module.exports = function(sequelize, Sequelize, User, Team, Task) {

    console.log('\trequirement model loaded');

    const Requirement = sequelize.define('requirement', {
        // attributes
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        // options
    });

    User.hasMany(Requirement);
    Team.hasMany(Requirement);
    Task.hasMany(Requirement);

    return Requirement;
};