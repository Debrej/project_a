module.exports = function(sequelize, Sequelize) {

    console.log('\tequipment type model loaded');

    const Equipment_Type = sequelize.define('equipment_type', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        // options
    });

    return Equipment_Type;
};