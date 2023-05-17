const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blogpost extends Model {}

Blogpost.init(
  {
    // ** id will auto generate
    blogpost_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 20],
      },
    },
    blogpost_contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogpost_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    //**foreign key: will auto generate
  },
  {
    sequelize,
  }
);

module.exports = Blogpost;
