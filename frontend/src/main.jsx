// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {BrowserRouter} from "react-router-dom"
// import UserContext from './context/UserContext.jsx'
// import { Toaster } from "react-hot-toast";

// createRoot(document.getElementById('root')).render(
//  <BrowserRouter>
//  <UserContext>
//     <App />
//     <Toaster position="top-right" reverseOrder={false} />
//  </UserContext>
//   </BrowserRouter>
// )




import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);