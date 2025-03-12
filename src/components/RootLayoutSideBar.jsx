import React from "react";
import SideBar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import NavbarSlidComponent from "./NavbarSlidComponent";

export default function RootLayoutSlidBar() {
  return (
    <main className="flex h-screen">
      <div className="h-screen fixed w-64">
        <SideBar />
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