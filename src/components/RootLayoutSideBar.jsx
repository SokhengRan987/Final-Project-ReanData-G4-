import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import NavbarSlidComponent from "./NavbarSlidComponent";
import MobileSlidComponent from "../components/MobileSlidComponent.jsx";
import { Menu } from "lucide-react";

export default function RootLayoutSlidBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  
  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      // Use md breakpoint (768px) for the transition
      setIsCompact(window.innerWidth < 1024); // 1024px is typically the 'lg' breakpoint
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <main className="flex h-screen">
      {/* Desktop Sidebar - Only visible on large screens (lg and above) */}
      {!isCompact && (
        <div className="h-screen fixed w-64">
          <SideBar />
        </div>
      )}
      
      {/* Mobile/Tablet Sidebar - Used for sm and md screens */}
      {isCompact && (
        <>
          {/* Mobile menu toggle button */}
          <button 
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          
          {/* Using MobileSlidComponent for sm and md screens */}
          <MobileSlidComponent 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
        </>
      )}
      
      {/* Main content */}
      <div className={`flex-1 ${!isCompact ? 'ml-64' : 'ml-0'} flex flex-col`}>
        <NavbarSlidComponent />
        
        <div className="overflow-auto pt-16 px-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
}