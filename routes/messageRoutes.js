const express = require('express');
const router = express.Router();
const {
  sendmessage,
  getMessages,
  getMessage,
  deleteMessage
} = require('../controllers/messageController');
const protect = require('../middleware/auth').protect;
const admin = require('../middleware/auth').admin;

router
  .route('/')
  .post(sendmessage)
  .get(protect, admin, getMessages);

router
  .route('/:id')
  .get(protect, admin, getMessage)
  .delete(protect, admin, deleteMessage);

module.exports = router;