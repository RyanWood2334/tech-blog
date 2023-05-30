const User = require("./User");
const Blogpost = require("./Blogpost");
const Comment = require("./Comment");

Blogpost.belongsTo(User, {
  onDelete: "Cascade",
});

User.hasMany(Blogpost, {
  onDelete: "Cascade",
});
User.hasMany(Comment, {
  onDelete: "Cascade",
});

Comment.belongsTo(Post, {
  onDelete: "CASCADE",
});

Blogpost.hasMany(Comment, {
  onDelete: "Cascade",
});

module.exports = {
  User: User,
  Blogpost: Blogpost,
  Comment: Comment,
};
