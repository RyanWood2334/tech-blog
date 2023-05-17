const sequelize = require("../config/connection");
const { User, Comment, Blogpost } = require("../models");
const userData = require("./user-seeds.json");
const blogpostData = require("./blogpost-seeds.json");
const commentData = require("./comment-seeds.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    await Blogpost.bulkCreate(blogpostData);

    await Comment.bulkCreate(commentData);
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

seedDatabase();
