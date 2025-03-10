import { useState } from "react";
import "./App.css";
// import FoodAndBeverage from "./components/FoodAndBeverage";
import Footer from "./components/Footer";
import NavbarComponent from "./components/NavbarComponent";
import DataSet from "./components/DataSet.JSX";
import Documentation from "./components/Documentation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarComponent />
      <main className="pt[60px]">
        {/* <h1 className="text-5xl text-blue-400 text-center bg-slate-100 py-4 uppercase rounded-lg h-screen">
          Kjel tver nas
        </h1> */}
        {/* <DataSet/> */}
        <Documentation/>
        {/* <FoodAndBeverage/> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
