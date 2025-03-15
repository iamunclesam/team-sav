import React from "react";
import { Outlet } from "react-router-dom";
import OnboardingLayer from "./onboardingLayer";
import { TestTubeIcon } from "lucide-react";

const SharedOnboarding = () => {
  return (
    <div className="max-w-md mx-auto relative">
      <OnboardingLayer />
      <div className="flex flex-col min-h-screen">
        <div className="text-center font-semibold text-xl text-white py-5 flex justify-center items-center gap-2 flex-grow">
          <div className="flex items-center gap-1 bg-white p-2 py-4 rounded-2xl rounded-tr-none">
            <TestTubeIcon color="#fb8500" />
            <p className="font-semibold">
              <span className="text-gray-900">Split</span>
              <span className="text-[#fb8500]">Wise</span>
            </p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SharedOnboarding;
