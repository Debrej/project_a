module.exports = function(sequelize, Sequelize, User, Event) {

    console.log('\tactivity model loaded');

    const Activity = sequelize.define('activity', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT('medium')
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        end_date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        // options
    });

    User.hasOne(Activity, { foreignKey: 'supervisor'});

    Activity.belongsTo(Event);

    return Activity;
};