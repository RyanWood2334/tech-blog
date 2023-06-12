const sequelize = require("../config/connection");
const { User, Comment, Post } = require("../models");
const userData = require("./user-seeds.json");
const postData = require("./blogpost-seeds.json");
const commentData = require("./comment-seeds.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: false });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    await Post.bulkCreate(postData);

    await Comment.bulkCreate(commentData);
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

seedDatabase();
