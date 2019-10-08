module.exports = function(sequelize, Sequelize, User) {

    console.log('\tteam model loaded');

    const Team = sequelize.define('team', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        underscored: true
    });

    User.hasOne(Team, { foreignKey: 'supervisor'});

    return Team;
};