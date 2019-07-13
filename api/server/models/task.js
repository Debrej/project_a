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
        // options
    });

    User.hasOne(Task, { foreignKey: 'supervisor'});

    Team.hasOne(Task);

    Location.hasOne(Task);

    Task.belongsTo(Activity);

    return Task;
};