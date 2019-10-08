module.exports = function(sequelize, Sequelize, User, Team, Task) {

    console.log('\trequirement model loaded');

    const Requirement = sequelize.define('requirement', {
        // attributes
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });

    User.hasMany(Requirement, { foreignKey: 'user_id'});
    Team.hasMany(Requirement, { foreignKey: 'team_id'});
    Task.hasMany(Requirement, { foreignKey: 'task_id'});

    return Requirement;
};