const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');

// POST /api/notes - Create single note
router.post('/', noteController.createNote);

// POST /api/notes/bulk - Create multiple notes
router.post('/bulk', noteController.createBulkNotes);

module.exports = router;