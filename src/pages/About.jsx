import React from "react";
import Footer from "../components/Footer";
import NavbarComponent from "../components/NavbarComponent";
import FooterV2 from "../components/FooterSampleV2";
import FooterSampleV2 from "../components/FooterSampleV2";
export default function About() {
  return (
    <>
      <NavbarComponent />
      <div className="flex justify-center items-center flex-col h-screen bg-slate-100">
        <h1 className="text-5xl text-slate-500 hover:cursor-pointer hover:underline transition-all ease-in-out">
          About Us
        </h1>
      </div>
      <FooterSampleV2 />
    </>
  );
}
