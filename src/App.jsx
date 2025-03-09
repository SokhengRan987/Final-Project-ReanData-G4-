import { useState } from "react";
import { useEffect } from "react";
import { Button } from "flowbite-react";
import "./App.css";
import About from "./pages/About";
import Navbar from "./components/NavbarComponent";
import Footer from "./components/Footer";
import NavbarComponent from "./components/NavbarComponent";
import HelpAndSupport from "./pages/HelpAndSupport";

function App() {
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const handleWheel = (event) => {
  //     if (event.ctrlKey) return; // Allow zooming with Ctrl + Scroll
  
  //     event.preventDefault();
  //     window.scrollBy({
  //       top: event.deltaY > 0 ? 300 : -300, // Faster scrolling
  //       behavior: "smooth",
  //     });
  //   };
  
  //   window.addEventListener("wheel", handleWheel, { passive: false });
  
  //   return () => window.removeEventListener("wheel", handleWheel);
  // }, []);
  
  

  return (
    <>
      <NavbarComponent />
      <main className="pt[60px]">
        <h1 className="text-5xl text-blue-400 text-center py-4 uppercase rounded-lg h-screen">
          Kjel tver nas
        </h1>
        <HelpAndSupport/>
      </main>
      <Footer />
    </>
  );
}

export default App;