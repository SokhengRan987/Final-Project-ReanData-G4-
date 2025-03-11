import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayoutSideBar() {
  return (
    <main className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="h-screen fixed w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Content Section */}
      <div className="flex-1 pl-64 overflow-y-auto" style={{ paddingTop: '10px' }}>
        <Outlet />
      </div>
    </main>
  );
}
