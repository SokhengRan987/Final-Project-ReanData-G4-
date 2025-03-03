import React from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import NavbarComponent from "../components/NavbarComponent";
import FooterV2 from "../components/FooterSampleV2";
import FooterSampleV2 from "../components/FooterSampleV2";
export default function About() {
    useEffect(() => {
      const handleWheel = (event) => {
        if (event.ctrlKey) return; // Allow zooming with Ctrl + Scroll
    
        event.preventDefault();
        window.scrollBy({
          top: event.deltaY > 0 ? 250 : -250, // Faster scrolling
          behavior: "smooth",
        });
      };
    
      window.addEventListener("wheel", handleWheel, { passive: false });
    
      return () => window.removeEventListener("wheel", handleWheel);
    }, []);
  return (
    <>
      <NavbarComponent />
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="text-5xl text-slate-500 hover:cursor-pointer hover:underline transition-all ease-in-out">
          About Us
        </h1>
      </div>
      <Footer/>
    </>
  );
}
