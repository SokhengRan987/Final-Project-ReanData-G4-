import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Profile from "./pages/Profile.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import RootLayoutSlidBar from "./components/RootLayoutSlidBar.jsx";
import Rootlayout from "./components/Rootlayout.jsx";
import Login from "./auth/Login.jsx";
import SignUp from "./auth/SignUp.jsx";
import ForgetPassword from "./auth/ForgetPassword.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <Routes>
            <Route element={<RootLayoutSlidBar />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/password" element={<ChangePassword />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route element={<Rootlayout />}></Route>
          </Routes>
        </StrictMode>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
