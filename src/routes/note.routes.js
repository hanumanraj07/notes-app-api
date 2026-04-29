const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');

// POST /api/notes - Create single note
router.post('/', noteController.createNote);

// POST /api/notes/bulk - Create multiple notes
router.post('/bulk', noteController.createBulkNotes);

// GET /api/notes - Get all notes
router.get('/', noteController.getAllNotes);

// GET /api/notes/:id - Get note by ID
router.get('/:id', noteController.getNoteById);

// PUT /api/notes/:id - Full replace
router.put('/:id', noteController.replaceNote);

// PATCH /api/notes/:id - Partial update
router.patch('/:id', noteController.updateNote);

// DELETE /api/notes/:id - Delete single
router.delete('/:id', noteController.deleteNote);

// DELETE /api/notes/bulk - Delete multiple notes
router.delete('/bulk', noteController.deleteBulkNotes);

// Search routes
router.get('/search/content', noteController.searchByContent);
router.get('/search/all', noteController.searchAll);
router.get('/search', noteController.searchByTitle);

module.exports = router;