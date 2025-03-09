import { useState } from "react";
import { useEffect } from "react";
import { Button } from "flowbite-react";
import "./App.css";
import LadingPage from "./pages/LadingPage";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import ForgetPassword from "./auth/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";

function App() {
  const [count, setCount] = useState(0);

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
  
  

  return (
    <>
      {/* <LadingPage/> */}
      {/* <Login/>
      <ForgetPassword/>
      <SignUp/>
      <ResetPassword/> */}
    </>
  );
}

export default App;