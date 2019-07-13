module.exports = function(sequelize, Sequelize, Shift, User) {

    console.log('\tavailability model loaded');

    const Availability = sequelize.define('availability', {
        // attributes

    }, {
        // options
    });

    User.hasMany(Availability);
    Shift.hasMany(Availability);

    return Availability;
};