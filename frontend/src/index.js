import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './app';
import { BrowserRouter ,Route,Routes } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import UserDashboard from "./userDashboard";
import News from "./news/news";
import Country from './country';
import About from './about';
import AllNews from './allNews';
import AboutF from './aboutFront';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<AboutF />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/news" element={<News />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/dashboard/country" element={<Country />} />
                <Route path="/dashboard/about" element={<About />} />
                <Route path="/dashboard/allNews" element={<AllNews />} />
                
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
