const Message = require('../models/Message');

// @desc    发送联系消息
// @route   POST /api/messages
// @access  Public
exports.sendmessage = async (req, res, next) => {
  try {
    const message = await Message.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    获取所有联系消息
// @route   GET /api/messages
// @access  Private/Admin
exports.getMessages = async (req, res, next) => {
  try {
    let query = Message.find();
    
    // 未读消息过滤
    if (req.query.unread === 'true') {
      query = query.where('isRead').equals(false);
    }
    
    query = query.sort({ createdAt: -1 });
    
    const messages = await query;
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    获取单个联系消息
// @route   GET /api/messages/:id
// @access  Private/Admin
exports.getMessage = async (req, res, next) => {
  try {
    let message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // 标记为已读
    if (!message.isRead) {
      message.isRead = true;
      await message.save();
    }
    
    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    删除联系消息
// @route   DELETE /api/messages/:id
// @access  Private/Admin
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    await message.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};