import { useState } from "react";
import "./App.css";
import  RootLayoutSlidBar  from "./components/SlidBarComponent";
import LadingPage from "./pages/LadingPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    // <>
    //   <RootLayoutSlidBar />
    // </>
    <LadingPage/>
  );
}

export default App;
