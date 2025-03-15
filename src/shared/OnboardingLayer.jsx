import React from "react";

const OnboardingLayer = () => {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="min-h-screen w-full max-w-md mx-auto absolute top-0 left-0 -z-20 layer" />
      <div className="absolute w-full h-screen bg-black/50 -z-10" />
    </div>
  );
};

export default OnboardingLayer;
