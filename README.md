# Notes App API

A RESTful API for a notes application built with Node.js, Express, and MongoDB.

## Features

- CRUD operations for notes
- Bulk create and delete operations
- Search functionality (title, content, or both)
- Filtering by category and pinned status
- Sorting by various fields
- Pagination
- Combined query operations (search + filter + sort + paginate)
- Master endpoint that supports all query operations in a single call

## Technology Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Dotenv for environment variables

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### CRUD Operations

- `POST /api/notes` - Create a single note
- `POST /api/notes/bulk` - Create multiple notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a note by ID
- `PUT /api/notes/:id` - Replace a note (full update)
- `PATCH /api/notes/:id` - Update a note (partial update)
- `DELETE /api/notes/:id` - Delete a note
- `DELETE /api/notes/bulk` - Delete multiple notes

### Search Operations

- `GET /api/notes/search?q=<query>` - Search in title only
- `GET /api/notes/search/content?q=<query>` - Search in content only
- `GET /api/notes/search/all?q=<query>` - Search in title and content

### Combined Query Operations

- `GET /api/notes/filter-sort` - Filter + Sort
- `GET /api/notes/filter-paginate` - Filter + Paginate
- `GET /api/notes/sort-paginate` - Sort + Paginate
- `GET /api/notes/search-filter` - Search + Filter
- `GET /api/notes/search-sort-paginate` - Search + Sort + Paginate
- `GET /api/notes/filter-sort-paginate` - Filter + Sort + Paginate

### Master Endpoint

- `GET /api/notes/query` - Everything (search + filter + sort + paginate)

### Additional

- `GET /api/notes/:id/summary` - Get note summary (limited fields)

## Request and Response Format

All responses follow this format:
```json
{
  "success": boolean,
  "message": string,
  "data": object/array/null
}
```

List endpoints include a `count` field. Paginated endpoints include a `pagination` object.

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `PORT`: Port to run the server on (default: 5000)

## Error Handling

- 400: Bad Request (missing required fields, invalid parameters)
- 404: Not Found
- 500: Internal Server Error

## License

MIT