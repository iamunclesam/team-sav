import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Home from "./pages/Home.jsx";
import Insights from "./pages/Insights.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/onboarding/Login.jsx";
import SignUp from "./pages/onboarding/SignUp.jsx";
import Welcome from "./pages/onboarding/Welcome.jsx";
import SplitDetails from "./pages/split/splitDetails.jsx";
import AllSplits from "./pages/split/allSplits.jsx";
import CreateSplit from "./pages/CreateSplit.jsx";
import MakeTransfer from "./pages/split/MakeTransfers.jsx";
import { Toaster } from "react-hot-toast";

import SharedLayout from "./shared/SharedLayout.jsx";
import SharedOnboarding from "./shared/SharedOnboarding.jsx";

function App() {
  const location = useLocation();
  const hideNavigation = ["/login", "/signup", "/welcome"].includes(
    location.pathname
  );

  return (
    // min-h-screen bg-gray-900
    <div className="max-w-md mx-auto relative">
      <Routes>
        <Route path="/" element={<SharedOnboarding />}>
          <Route index element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="/home" element={<SharedLayout />}>
          <Route index element={<Home />} />

          <Route path="splits" element={<AllSplits />} />
          <Route path="splits/:id" element={<SplitDetails />} />
          <Route path="splits/create" element={<CreateSplit />} />
          <Route path="splits/transfer" element={<MakeTransfer />} />

          <Route path="profile" element={<Profile />} />
          <Route path="insights" element={<Insights />} />
        </Route>
      </Routes>
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
