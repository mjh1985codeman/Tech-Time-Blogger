const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "This is a great blog!",
    user_id: 1,
    blog_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
