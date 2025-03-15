import React from "react";
import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

const SharedLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Outlet />
      <Navigation />
    </div>
  );
};

export default SharedLayout;
