module.exports = function(sequelize, Sequelize) {

    console.log('\tlocation model loaded');

    const Location = sequelize.define('location', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT('medium')
        },
        gps_long: {
            type: Sequelize.DECIMAL(9,6),
            allowNull: false
        },
        gps_lat: {
            type: Sequelize.DECIMAL(9,6),
            allowNull: false
        }
    }, {
        // options
    });

    return Location;
};