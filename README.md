# BeyondChats Blog System (AI Enhanced)

This project consists of a full-stack application that scrapes blog articles, enhances them using a (mock) AI worker, and displays them via a modern React frontend.

## 🏗 Architecture

```mermaid
graph TD
    User[User Browser] <--> Frontend["React Frontend (Vite)"]
    Frontend <--> API[Laravel Backend API]
    API <--> DB[(SQLite Database)]
    
    subgraph "AI Background Worker"
        Worker[Node.js Worker] --> API
        Worker --> External["External Content (Google/IBM)"]
        Worker --> Search[Search Engine]
    end
    
    subgraph "Initial Setup"
        Scraper[Scraper Script] --> API
    end
```

## 🚀 Local Setup Instructions

### Prerequisites
- **PHP** (v8.2+) & **Composer**
- **Node.js** (v18+) & **npm**
- **SQLite** (drivers enabled in `php.ini`)

### 1. Backend Setup (Laravel)
The backend serves the API and manages the database.

```bash
cd backend_core

# Install PHP dependencies
composer install

# Run database migrations
php artisan migrate

# Start the development server
php artisan serve
```
*Backend runs on: `http://127.0.0.1:8000`*

### 2. Populate Data (Scraper)
Fetch initial articles from BeyondChats.

```bash
cd backend_core

# Run the scraper
node scraper.cjs
```

### 3. AI Worker (Simulate AI Rewrites)
Run the worker to "enhance" articles with search results and AI rewriting.

```bash
cd ai-worker

# Install dependencies
npm install

# Run the worker script
node worker.js
```

### 4. Frontend Setup (React)
Launch the user interface.

```bash
cd frontend

# Install dependencies  
npm install

# Start the dev server
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

## 🌐 Live Link
**[Live Frontend Demo](https://deluxe-sunburst-03f586.netlify.app/)**  

> **Note:** The backend is running locally and tunneled via Ngrok. If the data doesn't load, it means my local tunnel is offline. Please refer to `DEPLOYMENT.md` for instructions on how to run it yourself.

## 📁 Repository Structure
- **/backend_core**: Laravel 11 API + SQLite Database.
- **/ai-worker**: Node.js script for AI processing.
- **/frontend**: React + Vite + TailwindCSS UI.