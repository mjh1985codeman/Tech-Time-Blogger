const router = require("express").Router();
const sequelize = require("../config/connection");
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//get all blogs for dashboard.
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("==================");
  Blog.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id"],
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
    .then((dbBlogData) => {
      const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
      res.render("dashboard", { blogs, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Module exports.
module.exports = router;
