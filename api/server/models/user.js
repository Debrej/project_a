module.exports = function(sequelize, Sequelize, Specialty) {

    console.log('\tuser model loaded');

    const User = sequelize.define('user', {
        // attributes
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        surname: {
            type: Sequelize.STRING
        },
        birthday: {
            type: Sequelize.DATE
        },

        phone_number: {
            type: Sequelize.STRING(10)
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },

        licence_date: {
            type: Sequelize.DATE
        },
        licence_scan_url: {
            type: Sequelize.STRING
        },

        profile_pic_url: {
            type: Sequelize.STRING,
            defaultValue: 'images/default_pic_url.jpg'
        },
        tshirt_size: {
            type: Sequelize.ENUM('XS','S','M','L','XL')
        },

        alcoholic_beverage_consumption: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        food_and_beverage_consumption: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        balance: {
            type: Sequelize.DECIMAL(6,2),
            defaultValue: 0.0,
            allowNull: false
        },

        comment: {
            type: Sequelize.TEXT('medium')
        },
        experience: {
            type: Sequelize.TEXT('medium')
        },
        incapacity: {
            type: Sequelize.TEXT('medium')
        },

        validity_status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        // options
    });

    User.belongsTo(Specialty);

    return User;
};