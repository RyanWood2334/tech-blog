const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Blogpost, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render("logohome", {
      logged_in: req.session.logged_in,
      account_deleted: req.query.account_deleted,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("profile", { users, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id, {
      include: [Blogpost],
    });
    const user = dbUserData.get({ plain: true });
    console.log(user);
    const blogpost = user.Blogposts;
    logged_in = true;

    console.log(blogpost);

    res.render("profile", { user, post, logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id, {
      include: [Blogpost],
      // include: [Comment],
    });
    const user = dbUserData.get({ plain: true });
    console.log(user);
    const blogpost = user.Blogpost;
    logged_in = true;

    console.log(blogpost);

    res.render("profile", { user, post, logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/home", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      include: [Blogpost, Comment],
    });

    const users = dbUserData.map((dbUser) => dbUser.get({ plain: true }));

    console.log(users);

    // console.log('==============================');

    const blogposts1 = users[0].Blogposts;
    const blogposts2 = users[1].Blogposts;
    const comments = users[0].Comments;
    const comments2 = users[1].Comments;

    const allBlogposts = blogposts1.concat(blogposts2);
    const allComments = comments.concat(comments2);

    // console.log(allPosts);
    // console.log('==============================');
    // console.log(allComments);

    const logged_in = true;

    res.render("home", { users, allBlogposts, allComments, logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/blogposts/:id", withAuth, async (req, res) => {
  try {
    const userData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          include: [Comment],
        },
      ],
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const blogposts = userData.get({ plain: true });
    const user = posts.User;
    const comment = user.Comments;

    console.log(blogposts);

    const logged_in = true;

    res.render("user", {
      blogposts,
      user,
      comment,
      logged_in,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/posts/:id", async (req, res) => {
  if (!req.session.logged_in) {
    return res.status(403).json({ msg: "Login!" });
  }
  try {
    // const { notes } = req.body.destination_notes;
    const updatedPost = await Blogpost.update(
      { text: req.body.text },
      { where: { id: req.params.id } }
    );
    if (!updatedPost) {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  // res.render('/profile');
});

module.exports = router;
