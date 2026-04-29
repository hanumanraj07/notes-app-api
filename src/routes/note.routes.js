const express = require('express');
const router = express.Router();
const {
  createNote,
  createBulkNotes,
} = require('../controllers/note.controller');

// CRUD routes
router.post('/', createNote);
router.post('/bulk', createBulkNotes);

module.exports = router;