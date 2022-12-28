import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import 'leaflet/dist/leaflet.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import App from './pages/app';
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Countries from "./pages/countries";
import Topics from "./pages/topics";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/countries" element={<Countries />} />
                <Route path="/topics" element={<Topics />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
