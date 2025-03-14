import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import CreateSplit from './pages/CreateSplit';
import Insights from './pages/Insights';
import Profile from './pages/Profile';
import Login from './pages/onboarding/Login';
import SignUp from './pages/onboarding/SignUp';
import Welcome from './pages/onboarding/Welcome';
import AllSplits from './pages/split/allSplit';
import SplitDetails from './pages/split/splitDetails';

function App() {
  const location = useLocation();
  const hideNavigation = ['/login', '/signup', '/welcome'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-900 max-w-md mx-auto relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSplit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/splits" element={<AllSplits />} />
        <Route path="/split/:id" element={<SplitDetails />} />
      </Routes>
      {!hideNavigation && <Navigation />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;