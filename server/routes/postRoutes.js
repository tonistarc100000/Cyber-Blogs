const express = require('express');
const router = express.Router();
const {
    getAllPosts,
    getAllPostsAdmin,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);

// Protected admin routes
router.get('/admin/all', protect, getAllPostsAdmin);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;

