import React from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import NavbarComponent from "../components/NavbarComponent";
import FooterV2 from "../components/FooterSampleV2";
import FooterSampleV2 from "../components/FooterSampleV2";
import BarChart from "../components/BarChart";
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
      <BarChart />
    </>
  );
}
