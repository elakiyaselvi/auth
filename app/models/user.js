const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        field: "name",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        field: "email",
        allowNull: false,
      },
      phonenumber: {
        type: DataTypes.INTEGER,
        field: "phonenumber",
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        field: "role",
      },
      createdby: {
        type: DataTypes.INTEGER,
        field: "created_by",
      },
      password: {
        type: DataTypes.STRING,
        field: "password",
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: (User, options) => {
          {
            User.password =
              User.password && User.password != ""
                ? bcrypt.hashSync(User.password, 10)
                : "";
          }
        },
        beforeUpdate: (User, options) => {
          {
            if (User.password) {
              User.password =
                User.password && User.password != ""
                  ? bcrypt.hashSync(User.password, 10)
                  : "";
            }
          }
        },
      },
    }
  );

  return User;
};
