import React from "react";
import SildBarCommponent from "../components/SildBarCommponent";
import { Outlet } from "react-router-dom";
import NavbarSlidComponent from "../components/NavbarSildCommponent";

export default function RootLayoutSlidBar() {
  return (
    <main className="flex h-screen">
      <div className="h-screen fixed w-64">
        <SildBarCommponent />
      </div>
      
      <div className="flex-1 ml-64 flex flex-col">
        <NavbarSlidComponent />
        
        <div className="overflow-auto mt-16">
          <Outlet />
        </div>
      </div>
    </main>
  );
}