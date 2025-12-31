import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <span className="text-xl font-bold text-gray-800">BeyondChats Blog (AI Enhanced)</span>
          </div>
        </nav>
        <div className="py-8">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </div>
        <footer className="text-center py-6 text-gray-400 text-sm">
          &copy; 2025 BeyondChats AI Assignment
        </footer>
      </div>
    </Router>
  );
}

export default App;