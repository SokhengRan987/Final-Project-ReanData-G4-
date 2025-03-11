import React from "react";
import SlidBarComponent from "./SlidBarComponent";
import { Outlet } from "react-router-dom";
import NavbarSlidComponent from "./NavbarSlidComponent";

export default function RootLayoutSlidBar() {
  return (
    <main className="flex h-screen">
      <NavbarSlidComponent/>
      <div className="h-screen fixed w-64">
        <SlidBarComponent />
      </div>
      
      <div 
        className="flex-1 ml-64  overflow-auto"
        style={{ paddingTop: '10px' }}
      >
        <Outlet />
      </div>
    </main>
  );
}