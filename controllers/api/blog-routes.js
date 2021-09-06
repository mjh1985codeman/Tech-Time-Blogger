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

router.get("/:id", (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "blog_id", "created_at"],
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
      if (!dbBlogData) {
        res.status(404).json({ message: "No Blog Post found with this id" });
        return;
      }
      res.json(dbBlogData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  //expects {title: 'new blog', content: 'this is the blog text', user_id: 1}
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((dbBlogData) => res.json(dbBlogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Edit Blog routes?

//Delete Blog Routes?

module.exports = router;
