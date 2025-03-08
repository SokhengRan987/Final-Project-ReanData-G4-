import { useState } from "react";
import { useEffect } from "react";
import { Button } from "flowbite-react";
import "./App.css";
import LadingPage from "./pages/LadingPage";

function App() {
  const [count, setCount] = useState(0);
<<<<<<< HEAD
  // useEffect(() => {
  //   const handleWheel = (event) => {
  //     if (event.ctrlKey) return; // Allow zooming with Ctrl + Scroll
  
  //     event.preventDefault();
  //     window.scrollBy({
  //       top: event.deltaY > 0 ? 1000 : -1000, // Faster scrolling
  //       behavior: "smooth",
  //     });
  //   };
  
  //   window.addEventListener("wheel", handleWheel, { passive: false });
  
  //   return () => window.removeEventListener("wheel", handleWheel);
  // }, []);
  
  

=======
>>>>>>> 21a1bc76a7437ab7b2b5946b23e6ac2c644d8478
  return (
    <>
      <LadingPage/>
    </>
  );
}

export default App;