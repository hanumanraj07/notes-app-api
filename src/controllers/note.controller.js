const Note = require('../models/note.model');
const mongoose = require('mongoose');

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

// POST /api/notes/bulk - Create multiple notes
exports.createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    // Validate notes array
    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'notes array is required and cannot be empty',
        data: null
      });
    }

    // Create multiple notes
    const createdNotes = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// GET /api/notes - Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    
    res.status(200).json({
      success: true,
      message: 'Notes fetched successfully',
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// GET /api/notes/:id - Get note by ID
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID',
        data: null
      });
    }

    // Find note by ID
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note fetched successfully',
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

// PUT /api/notes/:id - Full replace
exports.replaceNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, isPinned } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID',
        data: null
      });
    }

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
        data: null
      });
    }

    // Find and replace note
    const note = await Note.findByIdAndUpdate(
      id,
      {
        title,
        content,
        category: category || 'personal',
        isPinned: isPinned !== undefined ? isPinned : false
      },
      { new: true, overwrite: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note replaced successfully',
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

// PATCH /api/notes/:id - Partial update
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID',
        data: null
      });
    }

    // Check if any fields are provided
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields provided to update',
        data: null
      });
    }

    // Find and update note
    const note = await Note.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
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

// DELETE /api/notes/:id - Delete single
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID',
        data: null
      });
    }

    // Find and delete note
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// DELETE /api/notes/bulk - Delete multiple notes
exports.deleteBulkNotes = async (req, res) => {
  try {
    const { ids } = req.body;

    // Validate ids array
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'ids array is required and cannot be empty',
        data: null
      });
    }

    // Delete multiple notes
    const result = await Note.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// GET /api/notes/search - Search in title only
exports.searchByTitle = async (req, res) => {
  try {
    const { q } = req.query;

    // Validate search query
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query \'q\' is required',
        data: null
      });
    }

    // Search in title only
    const notes = await Note.find({
      title: { $regex: q, $options: 'i' }
    });

    res.status(200).json({
      success: true,
      message: `Search results for: ${q}`,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// GET /api/notes/search/content - Search in content only
exports.searchByContent = async (req, res) => {
  try {
    const { q } = req.query;

    // Validate search query
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query \'q\' is required',
        data: null
      });
    }

    // Search in content only
    const notes = await Note.find({
      content: { $regex: q, $options: 'i' }
    });

    res.status(200).json({
      success: true,
      message: `Content search results for: ${q}`,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// GET /api/notes/search/all - Search in title AND content
exports.searchAll = async (req, res) => {
  try {
    const { q } = req.query;

    // Validate search query
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query \'q\' is required',
        data: null
      });
    }

    // Search in title OR content
    const notes = await Note.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ]
    });

    res.status(200).json({
      success: true,
      message: `Search results for: ${q}`,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// GET /api/notes/filter-sort - Filter by category and/or isPinned — and sort the results
exports.filterAndSort = async (req, res) => {
  try {
    const { category, isPinned, sortBy, order } = req.query;

    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (isPinned !== undefined) filter.isPinned = isPinned === 'true';

    // Sorting
    const allowedSortFields = ['title', 'createdAt', 'updatedAt', 'category'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = order === 'asc' ? 1 : -1;

    // Execute query
    const notes = await Note.find(filter).sort({ [sortField]: sortOrder });

    res.status(200).json({
      success: true,
      message: 'Notes fetched successfully',
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// GET /api/notes/filter-paginate - Filter by category and/or isPinned — and paginate the filtered results
exports.filterAndPaginate = async (req, res) => {
  try {
    const { category, isPinned, page, limit } = req.query;

    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (isPinned !== undefined) filter.isPinned = isPinned === 'true';

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const total = await Note.countDocuments(filter);
    const notes = await Note.find(filter).skip(skip).limit(limitNum);

    res.status(200).json({
      success: true,
      message: 'Notes fetched successfully',
      data: notes,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// GET /api/notes/sort-paginate - Sort all notes — and paginate. No filtering here.
exports.sortAndPaginate = async (req, res) => {
  try {
    const { sortBy, order, page, limit } = req.query;

    // Sorting
    const allowedSortFields = ['title', 'createdAt', 'updatedAt', 'category'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = order === 'asc' ? 1 : -1;

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const total = await Note.countDocuments({});
    const notes = await Note.find({}).sort({ [sortField]: sortOrder }).skip(skip).limit(limitNum);

    res.status(200).json({
      success: true,
      message: 'Notes fetched successfully',
      data: notes,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};