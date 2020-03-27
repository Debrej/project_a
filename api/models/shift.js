module.exports = function(sequelize, Sequelize, Shift_Category) {
  console.log("\tshift model loaded");

  const Shift = sequelize.define(
    "shift",
    {
      // attributes
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      charisma: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );

  Shift.belongsTo(Shift_Category, { foreignKey: "shift_category_id" });

  return Shift;
};
