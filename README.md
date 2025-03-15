# To-Do List Application

A clean, minimal to-do list application inspired by Google Tasks and Apple Reminders, built with React and Express.

## Features

- ✅ Create, edit, and delete tasks
- 🔄 Mark tasks as complete/incomplete
- 📱 Responsive design for all devices
- 🔍 Filter tasks (All/Active/Completed)
- 🗑️ Clear completed tasks
- 💾 Automatic task persistence
- 🕒 Timestamp tracking for tasks

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm (comes with Node.js)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Usage Guide

### Creating Tasks
1. Type your task in the input field at the top
2. Press Enter or click submit to create the task

### Managing Tasks
- Click the checkbox to mark a task as complete
- Click the edit (pencil) icon to modify a task
- Click the bin icon to delete a task
- Use the filter buttons to view different task categories
- Click "Clear Completed Tasks" to remove all completed tasks

### Troubleshooting

Common issues and solutions:

1. **Tasks not saving:**
   - Check if localStorage is enabled in your browser
   - Clear browser cache and reload

2. **Page not loading:**
   - Ensure the server is running (npm run dev)
   - Check console for error messages
   - Verify port 5000 is not in use

3. **Changes not reflecting:**
   - Hard refresh the page (Ctrl/Cmd + Shift + R)
   - Check the console for error messages

## Project Structure

```
client/
  ├── src/
  │   ├── components/     # React components
  │   ├── lib/           # Utility functions
  │   ├── pages/         # Page components
  │   └── App.tsx        # Main application component
server/
  ├── routes.ts          # API endpoints
  ├── storage.ts         # Data storage logic
  └── index.ts          # Server entry point
shared/
  └── schema.ts         # Data types and validation
```

## Component Documentation

### TaskForm
Handles task creation with input validation and error handling.

### TaskList
Manages task display, filtering, and operations (edit/delete/complete).

### Storage System
Uses localStorage for persistence with automatic saving on changes.

## API Endpoints

- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `POST /api/tasks/clear-completed` - Remove all completed tasks

## Need Help?

For technical issues:
1. Check the console for error messages
2. Review the documentation above
3. Contact the development team

For feature requests or bug reports, please use the issue tracker.
