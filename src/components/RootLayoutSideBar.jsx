import React from "react";
import SideBar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import NavbarSlidComponent from "./NavbarSlidComponent";

export default function RootLayoutSlidBar() {
  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar Container */}
      <div className="hidden md:block md:w-64 flex-shrink-0 bg-white shadow-lg">
        <SideBar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 md:left-64 z-30 bg-white shadow-md">
          <NavbarSlidComponent />
        </div>
        
        {/* Content Outlet with Padding and Responsive Chart Container */}
        <div className="flex-1 mt-16 overflow-auto p-4">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}