# To-Do List Fullstack Application

A fullstack To-Do List app built with Node.js (Express), Angular, and MySQL.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation & Local Run](#installation--local-run)
- [Usage Guide](#usage-guide)
- [Deployment on Google Cloud Platform (GCP)](#deployment-on-google-cloud-platform-gcp)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

---

## Features

- User-friendly To-Do List management
- Categories and tags for tasks
- Due dates and task status
- Responsive Angular frontend
- RESTful Node.js backend with Sequelize ORM
- MySQL database
- Dockerized for easy deployment

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [MySQL](https://www.mysql.com/) (if running without Docker)
- [GCP account](https://cloud.google.com/) (for deployment)

---

## Installation & Local Run

### 1. Clone the repository

```bash
git clone https://github.com/leloucheamsted/todo-app-fullstack-node-angular.git
cd todo-app-fullstack-node-angular
```

### 2. Run with Docker (Recommended)

```bash
docker-compose up --build
```

- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend API: [http://localhost:3000/api](http://localhost:3000/api)
- MySQL: localhost:3306 (user: root, password: '', db: todo_db)

### 3. Run locally without Docke

#### Frontend

```bash
cd frontend
npm install
npm start
```

#### Backend

```bash
cd ../backend
npm install
npm start
```

## Running unit tests and others 

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```



- Visit [http://localhost:4200](http://localhost:4200) in your browser.

---

## Usage Guide

1. **Add a Task:**  
  On the mobile  ui version => Click  on the circule "+" button, fill in the title, description, category, and due date, then save.
  On the widescreen version, the add task view is on the right side of the screen

2. **Edit/Delete a Task:**  
   Click on a task in the list to edit or delete it.

3. **Categories**  
   Manage categories  from the sidebar.

---

## Deployment on Google Cloud Platform (GCP)

### 1. Prepare Docker Images

Build and push your images to [Google Container Registry](https://cloud.google.com/container-registry):

```bash
docker build -t gcr.io/YOUR_PROJECT_ID/todo-backend ./backend
docker build -t gcr.io/YOUR_PROJECT_ID/todo-frontend ./frontend

docker push gcr.io/YOUR_PROJECT_ID/todo-backend
docker push gcr.io/YOUR_PROJECT_ID/todo-frontend
```

### 2. Deploy MySQL

- Use [Cloud SQL](https://cloud.google.com/sql/docs/mysql) for managed MySQL.
- Create a Cloud SQL instance and database (`todo_db`).

### 3. Deploy Backend

- Use [Cloud Run](https://cloud.google.com/run/) or [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/).
- Set environment variables for DB connection (host, user, password, db, port).
- Allow backend to connect to Cloud SQL (see [Cloud SQL Auth Proxy](https://cloud.google.com/sql/docs/mysql/connect-run)).

### 4. Deploy Frontend

- Deploy the Angular static files to [Cloud Storage](https://cloud.google.com/storage/) (as a static website) or serve via [Cloud Run](https://cloud.google.com/run/).

### 5. Configure Networking

- Ensure frontend can reach backend API.
- Set CORS if needed.

---

## Project Structure

```
todo-app-fullstack-node-angular/
│
├── backend/      # Node.js Express API
├── frontend/     # Angular app
├── docker-compose.yml
├── README.md
└── ...
```

---

## Troubleshooting

- **Database connection refused:**  
  Ensure MySQL is running and accessible. If using Docker, the backend waits for MySQL to be ready.
- **Port conflicts:**  
  Make sure ports 3000 (backend), 4200 (frontend), and 3306 (MySQL) are free.
- **GCP deployment issues:**  
  Check logs in Cloud Run/Cloud SQL and verify environment variables.

---

## License

MIT

---

**Enjoy your To-Do List app!**