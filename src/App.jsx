import { useState } from "react";
import { useEffect } from "react";
import { Button } from "flowbite-react";
import "./App.css";
import LadingPage from "./pages/LadingPage";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <LadingPage/>
    </>
  );
}

export default App;