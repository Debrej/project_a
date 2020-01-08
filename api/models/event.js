module.exports = function(sequelize, Sequelize) {

    console.log('\tevent model loaded');

    return sequelize.define('event', {
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
        },
        logo_url: {
            type: Sequelize.STRING,
            defaultValue: 'event_logo_default.png'
        }
    }, {
        underscored: true
    });
};