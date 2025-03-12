import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Fixed import path
import { Provider } from "react-redux"; // Added missing import for Redux Provider
import store from "./redux/store";// Import Redux store
import "./index.css";
import App from "./App.jsx";
import About from "./pages/About.jsx";
import Rootlayout from "./components/Rootlayout.jsx";
import Login from "./auth/Login.jsx";
import SignUp from "./auth/SignUp.jsx";
import ForgetPassword from "./auth/ForgetPassword.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
 <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
   <Provider store={store}> {/* Wrap App inside Provider */}
    <BrowserRouter> {/* Wrap Routes inside BrowserRouter */}
      <StrictMode>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
          <Route element={<Rootlayout />}>
            <Route path="/" element={<App />} />
            
            <Route path="/about-us" element={<About />} />
          </Route>
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </Provider>
 </GoogleOAuthProvider>
);
