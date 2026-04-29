const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes will be mounted here
app.use('/api/notes', require('./routes/note.routes'));

module.exports = app;