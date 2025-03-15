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

## Deployment Guide

### Building for Production

1. Run the build command:
```bash
npm run build
```
This creates:
- Client files in `server/public/`
- Server bundle in `dist/index.js`

2. Important directories:
   - The build process puts client files in `server/public/`
   - Ensure this directory exists and is accessible
   - The server will automatically serve files from this location

3. Start the production server:
```bash
NODE_ENV=production node dist/index.js
```

### Deployment Checklist

- ✅ Run `npm run build` to generate production files
- ✅ Verify `server/public` contains static assets:
  - Check for `index.html`
  - Check for `.js` and `.css` files in `assets/`
- ✅ Set Node.js version to 20 or higher
- ✅ Test the production build locally
- ✅ Check server logs for any errors

### Deployment Troubleshooting

1. **Static files not found:**
   - Confirm files exist in `server/public/`
   - Check server logs for file path errors
   - Verify permissions on the directory

2. **Server won't start:**
   - Ensure Node.js 20+ is installed
   - Check if port 5000 is available
   - Look for error messages in the console

3. **Application not loading:**
   - Check browser console for errors
   - Verify all static assets are being served
   - Clear browser cache and reload

### Technical Support Notes

For developers and technical team members:

1. **Build Process**
   - The build process has two parts:
     1. Client build: Creates static files in `server/public/`
     2. Server build: Creates `dist/index.js`
   - Both must complete successfully

2. **Common Deployment Issues**
   - Port conflicts: The app uses port 5000 by default
   - Static files not found: Check `server/public` directory
   - Server not starting: Verify Node.js version (20+)

3. **Performance Monitoring**
   - Check browser console for client-side errors
   - Server logs will show API endpoint access
   - localStorage usage can be monitored in DevTools

4. **Security Considerations**
   - No sensitive data is stored (tasks are local)
   - API endpoints use proper validation
   - Client-side code is minified and optimised

## Need Help?

For technical issues:
1. Check the console for error messages
2. Review the documentation above
3. Contact the development team

For feature requests or bug reports, please use the issue tracker.