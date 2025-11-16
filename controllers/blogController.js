const BlogPost = require('../models/BlogPost');

// @desc    获取所有博客文章
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
  try {
    let query = BlogPost.find();
    
    // 分类过滤
    if (req.query.category) {
      query = query.where('category').equals(req.query.category);
    }
    
    // 标签过滤
    if (req.query.tag) {
      query = query.where('tags').equals(req.query.tag);
    }
    
    // 排序
    query = query.sort({ createdAt: -1 });
    
    const blogs = await query;
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    获取单个博客文章
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id)
      .populate('author', 'name email')
      .populate('comments');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // 更新阅读次数
    blog.readCount = blog.readCount + 1;
    await blog.save();
    
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    创建新博客文章
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res, next) => {
  try {
    // 添加作者ID
    req.body.author = req.user.id;
    
    const blog = await BlogPost.create(req.body);
    
    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    更新博客文章
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res, next) => {
  try {
    let blog = await BlogPost.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // 检查是否是作者或管理员
    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }
    
    blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    删除博客文章
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // 检查是否是作者或管理员
    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    
    await blog.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};