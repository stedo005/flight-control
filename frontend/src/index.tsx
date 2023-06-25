import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddRcModel from './pages/AddRcModel';
import Flightlist from './pages/Flightlist';
import UpdateRcModel from './pages/UpdateRcModel';
import PilotItem from './pages/PilotItem';
import UpdatePilot from './pages/UpdatePilot';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={"Loading..."}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/pilot" element={<PilotItem />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/add-rc-model" element={<AddRcModel />} />
                        <Route path="/update-rc-model/:modelId" element={<UpdateRcModel />} />
                        <Route path="/update-pilot/:pilotId" element={<UpdatePilot />} />
                        <Route path="/flightlist" element={<Flightlist />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
