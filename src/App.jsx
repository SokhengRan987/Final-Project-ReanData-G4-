import { useState } from "react";
import { Button } from "flowbite-react";
import "./App.css";
import About from "./pages/About";
import Navbar from "./components/NavbarComponent";
import Footer from "./components/Footer";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarComponent />
      <main className="pt[60px]">
        <h1 className="text-5xl text-blue-400 text-center bg-slate-100 py-4 uppercase rounded-lg h-screen">
          Kjel tver nas
        </h1>
      </main>
      <Footer />
    </>
  );
}

export default App;
