module.exports = function(sequelize, Sequelize) {

    console.log('\tspecialty model loaded');

    const Specialty = sequelize.define('specialty', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        year: {
            type: Sequelize.INTEGER
        }
    }, {
        // options
    });

    return Specialty;
};