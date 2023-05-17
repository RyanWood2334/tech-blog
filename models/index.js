const User = require("./User");
const Blogpost = require("./Blogpost");
const Comment = require("./Comment");

User.hasMany(Blogpost, {
  onDelete: "Cascade",
});
User.hasMany(Comment, {
  onDelete: "Cascade",
});

Blogpost.hasMany(Comment, {
  onDelete: "Cascade",
});

module.exports = {
  User: User,
  Blogpost: Blogpost,
  Comment: Comment,
};
