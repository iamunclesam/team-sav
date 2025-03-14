import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import CreateSplit from './pages/CreateSplit';
import Insights from './pages/Insights';
import Profile from './pages/Profile';
import SplitDetails from './pages/SplitDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 max-w-md mx-auto relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateSplit />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/split/:id" element={<SplitDetails />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;