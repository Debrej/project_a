module.exports = function(sequelize, Sequelize, User, Team) {

    console.log('\tnotification model loaded');

    const Notification = sequelize.define('notification', {
        // attributes
        content: {
            type: Sequelize.TEXT('medium'),
            allowNull: false
        }
    }, {
        underscored: true
    });

    User.hasOne(Notification, { foreignKey: 'user_id'});
    Team.hasOne(Notification, { foreignKey: 'team_id'});

    return Notification;
};