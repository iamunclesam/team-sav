import React from "react";
import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

const SharedLayout = () => {
  return (
    <div>
      <Outlet />
      <Navigation />
    </div>
  );
};

export default SharedLayout;
