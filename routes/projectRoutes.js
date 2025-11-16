const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const protect = require('../middleware/auth').protect;
const admin = require('../middleware/auth').admin;

router
  .route('/')
  .get(getProjects)
  .post(protect, admin, createProject);

router
  .route('/:id')
  .get(getProject)
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

module.exports = router;