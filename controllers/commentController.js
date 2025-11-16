const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// @desc    获取文章的所有评论
// @route   GET /api/blogs/:blogId/comments
// @access  Public
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.blogId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    添加评论
// @route   POST /api/blogs/:blogId/comments
// @access  Private
exports.addComment = async (req, res, next) => {
  try {
    // 检查文章是否存在
    const blogPost = await BlogPost.findById(req.params.blogId);
    
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // 创建评论
    const comment = await Comment.create({
      content: req.body.content,
      author: req.user.id,
      post: req.params.blogId
    });
    
    // 添加评论到文章
    blogPost.comments.push(comment._id);
    await blogPost.save();
    
    // 返回带有作者信息的评论
    const commentWithAuthor = await Comment.findById(comment._id)
      .populate('author', 'name email');
    
    res.status(201).json({
      success: true,
      data: commentWithAuthor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    删除评论
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // 检查是否是评论作者或管理员
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    
    // 从文章中移除评论引用
    const blogPost = await BlogPost.findById(comment.post);
    if (blogPost) {
      blogPost.comments = blogPost.comments.filter(
        (commentId) => commentId.toString() !== req.params.id
      );
      await blogPost.save();
    }
    
    await comment.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};