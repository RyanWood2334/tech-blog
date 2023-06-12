const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    // ** id will auto generate
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 20],
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //**foreign key: will auto generate
  },
  {
    sequelize,
  }
);

module.exports = Post;
