const router = require("express").Router();
const { User, Blogpost, Comment } = require("../../models");

const userRoutes = require("./userRoutes");
const postRoutes = require("./blogpostRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/blogposts", postRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
