const Blog = require("../Models/Blog");
const { sendErrorEmail } = require("../Utils/errorEmail");
const errorHandler = require("../Utils/errorHandler");

const createBlog = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        // Create the blog
        const newBlog = await Blog.create({
            title,
            content,
            author
        });
        return res.status(201).json({
            blog: newBlog,
            message: "Blog created successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
};

const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the blog by ID
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                status: "error"
            });
        }

        return res.status(200).json({
            blog,
            message: "Blog retrieved successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        // Find all blogs
        const blogs = await Blog.find();

        return res.status(200).json({
            blogs,
            message: "Blogs retrieved successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        // Find the blog by ID and update
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({
                message: "Blog not found",
                status: "error"
            });
        }

        return res.status(200).json({
            blog: updatedBlog,
            message: "Blog updated successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the blog by ID and delete
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found",
                status: "error"
            });
        }

        return res.status(200).json({
            blog: deletedBlog,
            message: "Blog deleted successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
};

module.exports = {
    createBlog,
    getBlogById,
    getAllBlogs,
    updateBlog,
    deleteBlog
};
