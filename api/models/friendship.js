module.exports = function(sequelize, Sequelize, User) {
  console.log("\tfriendship model loaded");

  const Friendship = sequelize.define(
    "friendship",
    {
      // Attributes
    },
    {
      underscored: true
    }
  );

  User.hasOne(Friendship, { foreignKey: "user_id" });
  User.hasOne(Friendship, { foreignKey: "friend_id" });

  return Friendship;
};
