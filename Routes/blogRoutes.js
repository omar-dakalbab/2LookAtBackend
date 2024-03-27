const express = require("express");
const blogRoute = express.Router();
const blogController = require("../Controllers/blogController");

// Routes for handling blog CRUD operations
blogRoute.post("/", blogController.createBlog);
blogRoute.get("/:id", blogController.getBlogById);
blogRoute.get("/", blogController.getAllBlogs);
blogRoute.put("/:id", blogController.updateBlog);
blogRoute.delete("/:id", blogController.deleteBlog);

module.exports = blogRoute;
