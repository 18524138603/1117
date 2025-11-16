const express = require('express');
const router = express.Router();
const { deleteComment } = require('../controllers/commentController');
const protect = require('../middleware/auth').protect;

// 独立的评论删除路由
router.delete('/:id', protect, deleteComment);

module.exports = router;