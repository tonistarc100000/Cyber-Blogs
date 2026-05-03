const Post = require('../models/Post');

// GET all published posts — PUBLIC
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ isPublished: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET all posts including drafts — ADMIN only
const getAllPostsAdmin = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET single post by slug — PUBLIC
const getPostBySlug = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// CREATE post — ADMIN only
const createPost = async (req, res) => {
    try {
        const { title, slug, content, excerpt, tags, isPublished, coverImage } = req.body;

        const postExists = await Post.findOne({ slug });
        if (postExists) {
            return res.status(400).json({ success: false, message: 'Slug already exists' });
        }

        const post = await Post.create({
            title,
            slug,
            content,
            excerpt,
            tags,
            isPublished,
            coverImage,
        });

        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// UPDATE post — ADMIN only
const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE post — ADMIN only
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllPosts,
    getAllPostsAdmin,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost,
};