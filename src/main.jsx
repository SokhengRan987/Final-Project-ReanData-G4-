import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import {Routes, Route} from "react-router";
import "./index.css";
import App from "./App.jsx";
import About from "./pages/About.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);