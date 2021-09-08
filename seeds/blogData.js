const { Blog } = require("../models");

const blogData = [
  {
    title: "Cats vs Dogs, the ultimate debate",
    content:
      "Honestly there is no debate, everyone knows dogs are way better than cats.",
    user_id: 1,
  },
  {
    title: "Why coders will rule the world",
    content: "I mean if we are honest they already do ;).",
    user_id: 1,
  },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
