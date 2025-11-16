const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const protect = require('../middleware/auth').protect;
const {
  getComments,
  addComment
} = require('../controllers/commentController');

// 博客文章路由
router
  .route('/')
  .get(getBlogs)
  .post(protect, createBlog);

router
  .route('/:id')
  .get(getBlog)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

// 评论路由（嵌套在博客路由中）
router
  .route('/:blogId/comments')
  .get(getComments)
  .post(protect, addComment);

module.exports = router;