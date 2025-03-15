import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import Home from './pages/Home.jsx';
import Insights from './pages/Insights.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/onboarding/Login.jsx';
import SignUp from './pages/onboarding/SignUp.jsx';
import Welcome from './pages/onboarding/Welcome.jsx';
import SplitDetails from './pages/split/splitDetails.jsx';
import AllSplits from "./pages/split/allSplits.jsx"
import CreateSplit from "./pages/CreateSplit.jsx"
import MakeTransfer from "./pages/MakeTransfers.jsx"
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const hideNavigation = ['/login', '/signup', '/welcome'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-900 max-w-md mx-auto relative">
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/create" element={<CreateSplit />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/splits" element={<AllSplits />} />
        <Route path="/split/:id" element={<SplitDetails />} />
        <Route path="/transfer" element={<MakeTransfer />} />
      </Routes>
     
      {!hideNavigation && <Navigation />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Toaster />
      <App />
    </Router>
  );
}

export default AppWrapper;