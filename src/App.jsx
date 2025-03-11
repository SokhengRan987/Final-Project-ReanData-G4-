<<<<<<< HEAD
import React from "react";
import "./App.css";
import LandingPage from "./pages/LadingPage";
=======
import { useState } from "react";
import "./App.css";
// import FoodAndBeverage from "./components/FoodAndBeverage";
import Footer from "./components/Footer";
import NavbarComponent from "./components/NavbarComponent";
import DataSet from "./components/DataSet.JSX";
import Documentation from "./components/Documentation";
>>>>>>> 889806776b6360802b8f2f9044d277960be3949d

function App() {

  return (
    <>
<<<<<<< HEAD
      <LandingPage />
=======
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
>>>>>>> 889806776b6360802b8f2f9044d277960be3949d
    </>
  );
}

export default App;
