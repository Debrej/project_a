module.exports = function(sequelize, Sequelize, User, Activity, Location, Team) {

    console.log('\ttask model loaded');

    const Task = sequelize.define('task', {
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
        underscored: true
    });

    User.hasOne(Task, { foreignKey: 'supervisor_id'});

    Team.hasOne(Task, { foreignKey: 'team_id'});

    Location.hasOne(Task, { foreignKey: 'location_id'});

    Task.belongsTo(Activity, { foreignKey: 'activity_id'});

    return Task;
};