# MERN Task Manager with Kanban Board

This project is a task management web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It features a Kanban board for organizing tasks, drag and drop functionality for easy task management, and instant syncing across clients using WebSockets.

## Features

- **Kanban Board:** Visualize your tasks in different stages (e.g., To Do, In Progress, Done).
- **Drag and Drop:** Easily move tasks across the board to update their status.
- **Instant Syncing:** Changes are instantly synced across all clients using WebSockets, ensuring real-time updates for all users.
- **Authentication:** Secure login and registration system to manage access to the task manager.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installing

Clone the repository to your local machine:

```
git clone https://github.com/YOUR_USERNAME/kanban-task-manager.git
cd mern-task-manager-kanban
```

Install dependencies for the client:

```
cd ./frontend
npm install
```

### Running the Application

Start the client:

```
cd frontend
npm start
```

The application will be running at [http://localhost:3000](http://localhost:3000).
