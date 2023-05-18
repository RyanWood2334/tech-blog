const express = require("express");
const router = express.Router();
const { User, Blogpost, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  if (!req.session.logged_in) {
    return res.status(403).json({ msg: "Login before adding a stamp!" });
  }
  try {
    const newBlogpost = await Blogpost.create({
      // ...req.body,
      ...req.body,
      //add image url here?
      UserId: req.session.user_id,
      // UserId: req.session.user_id,
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route for adding a comment to a blogpost
// router.put("/:id/like", withAuth, async (req, res) => {
//   const user_id = req.session.user_id;
//   const blogpost_id = req.params.id;

//   const likeWhereClause = {
//     where: {
//       UserId: user_id,
//       BlogpostId: blogpost_id,
//     },
//   };

//   await Comment.create({
//     UserId: user_id,
//     BlogpostId: blogpost_id,
//   });

//   const likes = await Comment.findAll({
//     where: {
//       BlogpostId: blogpost_id,
//     },
//   });

//   res.status(200).json({
//   });
// });

//route for deleting a blogpost
router.delete("/:id", async (req, res) => {
  if (!req.session.logged_in) {
    return res.status(403).json({ msg: "Login before deleting a blogpost!" });
  }
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        UserId: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: "No blogpost found with this id!" });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});
