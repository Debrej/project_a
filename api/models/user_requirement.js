module.exports = function(sequelize, Sequelize, User, Team, Task, Shift) {
  console.log("\trequirement model loaded");

  const User_Requirement = sequelize.define(
    "user_requirement",
    {
      // attributes
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );

  User.hasMany(User_Requirement, { foreignKey: "user_id" });
  Team.hasMany(User_Requirement, { foreignKey: "team_id" });
  Task.hasMany(User_Requirement, { foreignKey: "task_id" });
  Shift.hasMany(User_Requirement, { foreignKey: "shift_id" });

  return User_Requirement;
};
