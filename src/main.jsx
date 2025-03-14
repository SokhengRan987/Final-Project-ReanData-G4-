// // import { StrictMode } from "react";
// // import { createRoot } from "react-dom/client";
// // import { BrowserRouter, Routes, Route } from "react-router-dom"; // Fixed import path
// // import { Provider } from "react-redux"; // Added missing import for Redux Provider
// // import store from "./redux/store";// Import Redux store
// // import "./index.css";
// // import App from "./App.jsx";
// // import About from "./pages/About.jsx";
// // import Rootlayout from "./components/Rootlayout.jsx";
// // import Login from "./auth/Login.jsx";
// // import SignUp from "./auth/SignUp.jsx";
// // import ForgetPassword from "./auth/ForgetPassword.jsx";
// // import ResetPassword from "./auth/ResetPassword.jsx";
// // import { GoogleOAuthProvider } from "@react-oauth/google";
// // import Profile from "./pages/Profile.jsx";
// // import ChangePassword from "./pages/ChangePassword.jsx";
// // import { RootLayoutSlidBar } from "./components/SlidBarComponent.jsx";

// // createRoot(document.getElementById("root")).render(
// //  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
// //    <Provider store={store}> {/* Wrap App inside Provider */}
// //     <BrowserRouter> {/* Wrap Routes inside BrowserRouter */}
// //       <StrictMode>
// //         <Routes>
// //           <Route element ={<RootLayoutSlidBar}/>
// //           <Route path="/profile" element={<Profile/>}/>
// //           <Route path="/changepassword" element={<ChangePassword/>}/>
// //         {/* <Route path="/login" element={<Login />} />
// //         <Route path="/signup" element={<SignUp />} />
// //         <Route path="/forgetpassword" element={<ForgetPassword />} />
// //         <Route path="/resetpassword" element={<ResetPassword />} />
// //           <Route element={<Rootlayout />}>
// //             <Route path="/" element={<App />} />
            
// //             <Route path="/about-us" element={<About />} />
// //           </Route> */}
// //         </Routes>
// //       </StrictMode>
// //     </BrowserRouter>
// //   </Provider>
// //  </GoogleOAuthProvider>
// // );
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import "./index.css";
// // import App from "./App.jsx";
// // import About from "./pages/About.jsx";
// // import Rootlayout from "./components/Rootlayout.jsx";
// // import Login from "./auth/Login.jsx";
// // import SignUp from "./auth/SignUp.jsx";
// // import ForgetPassword from "./auth/ForgetPassword.jsx";
// // import ResetPassword from "./auth/ResetPassword.jsx";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Profile from "./pages/Profile.jsx";
// import ChangePassword from "./pages/ChangePassword.jsx";
// import { RootLayoutSlidBar } from "./components/SlidBarComponent.jsx";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//     <Provider store={store}>
//       <BrowserRouter>
//         <StrictMode>
//           <Routes>
//             {/* RootLayoutSlidBar as a layout route */}
//             <Route element={<RootLayoutSlidBar />}>
//               <Route path="/" element={<App/>}
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/changepassword" element={<ChangePassword />} />
//             </Route>

//             {/* Uncomment and fix the commented routes if needed */}
//             {/* 
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/forgetpassword" element={<ForgetPassword />} />
//             <Route path="/resetpassword" element={<ResetPassword />} />
//             <Route element={<Rootlayout />}>
//               <Route path="/" element={<App />} />
//               <Route path="/about-us" element={<About />} />
//             </Route>
//             */}
//           </Routes>
//         </StrictMode>
//       </BrowserRouter>
//     </Provider>
//   </GoogleOAuthProvider>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Profile from "./pages/Profile.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import RootLayoutSlidBar  from "./components/RootLayoutSlidBar.jsx";
// import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <Routes>
            {/* RootLayoutSlidBar as a layout route */}
            <Route element={<RootLayoutSlidBar/>}>

              {/* <Route path="/" element={<App />} /> */}
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/password" element={<ChangePassword />} />
            </Route>

            {/* Uncomment and fix the commented routes if needed */}
            {/* 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route element={<Rootlayout />}>
              <Route path="/" element={<App />} />
              <Route path="/about-us" element={<About />} />
            </Route>
            */}
          </Routes>
        </StrictMode>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);