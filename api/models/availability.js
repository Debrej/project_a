module.exports = function(sequelize, Sequelize, Shift, User) {
  console.log("\tavailability model loaded");

  const Availability = sequelize.define(
    "availability",
    {
      // attributes
    },
    {
      underscored: true
    }
  );

  User.hasMany(Availability, { foreignKey: "user_id" });
  Shift.hasMany(Availability, { foreignKey: "shift_id" });

  return Availability;
};
