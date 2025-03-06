import React from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import NavbarComponent from "../components/NavbarComponent";
import FooterV2 from "../components/FooterSampleV2";
import FooterSampleV2 from "../components/FooterSampleV2";
export default function About() {
  // useEffect(() => {
  //   const handleWheel = (event) => {
  //     if (event.ctrlKey) return; // Allow zooming with Ctrl + Scroll

  //     event.preventDefault();
  //     window.scrollBy({
  //       top: event.deltaY > 0 ? 250 : -250, // Faster scrolling
  //       behavior: "smooth",
  //     });
  //   };

  //   window.addEventListener("wheel", handleWheel, { passive: false });

  //   return () => window.removeEventListener("wheel", handleWheel);
  // }, []);
  return (
    <>
      <div class="flex min-h-screen items-center justify-center p-10">
        <div class="w-max">
          <h1 class="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-black pr-5 text-5xl text-black font-bold">
            Hello World
          </h1>
        </div>
      </div>
    </>
  );
}
