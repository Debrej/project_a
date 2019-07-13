module.exports = function(sequelize, Sequelize, User, Team) {

    console.log('\tnotification model loaded');

    const Notification = sequelize.define('notification', {
        // attributes
        content: {
            type: Sequelize.TEXT('medium'),
            allowNull: false
        }
    }, {
        // options
    });

    User.hasOne(Notification, { foreignKey: 'user'});
    Team.hasOne(Notification, { foreignKey: 'team'});

    return Notification;
};