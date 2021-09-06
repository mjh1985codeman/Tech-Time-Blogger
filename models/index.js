// import all models.
const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");
//create associations
User.hasMany(Blog, {
  foreignKey: "user_id",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
  onDelete: "SET NULL",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
});

// export models.
module.exports = { User, Blog, Comment };
