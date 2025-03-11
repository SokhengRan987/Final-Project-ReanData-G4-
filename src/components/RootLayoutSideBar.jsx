import React from "react";
// import SideBarComponent from "./SlidBarComponent";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayoutSideBar() {
    return (
      <main className="flex h-screen">
        <div className="h-screen fixed w-64">
          <Sidebar />
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