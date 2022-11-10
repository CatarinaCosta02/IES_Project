import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './app';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./login";
import Register from "./register";
import UserDashboard from "./userDashboard";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
