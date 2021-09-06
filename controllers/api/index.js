const router = require("express").Router();

const userRoutes = require("./user-routes.js"); //done.
const blogRoutes = require("./blog-routes"); //done.
const commentRoutes = require("./comment-routes"); //done.

router.use("/users", userRoutes); //done.
router.use("/blogs", blogRoutes); //done.
router.use("/comments", commentRoutes); //done.

module.exports = router;
