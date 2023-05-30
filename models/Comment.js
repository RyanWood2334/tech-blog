const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    // ** id will auto generate
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isAlpha: true,
      // },
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    //**foreign key: will auto generate
  },
  {
    sequelize,
  }
);

module.exports = Comment;
