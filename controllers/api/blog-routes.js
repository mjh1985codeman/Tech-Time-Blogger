const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
// get all blogs.

router.get("/", (req, res) => {
  console.log("================");
  Blog.findAll({
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogData) => res.json(dbBlogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
