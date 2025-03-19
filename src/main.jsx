import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App'; 
import Dashboard from './components/Dashboard';

import RootLayoutSlidBar from './components/RootLoyoutSlideBar';

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route element={<RootLayoutSlidBar/>}>  
            {/* Add root route */}
            <Route path='/' element={<App />} />  {/* This handles "/" */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add catch-all route for 404 */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </StrictMode>
    </BrowserRouter>
);


