module.exports = function(sequelize, Sequelize) {

    console.log('\tshift category model loaded');

    const Shift_Category = sequelize.define('shift_category', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        // options
    });

    return Shift_Category;
};