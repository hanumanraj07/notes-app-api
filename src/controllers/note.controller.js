const Note = require('../models/note.model');

// POST /api/notes - Create single note
exports.createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
        data: null
      });
    }

    // Create note
    const note = await Note.create({
      title,
      content,
      category: category || 'personal',
      isPinned: isPinned !== undefined ? isPinned : false
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};