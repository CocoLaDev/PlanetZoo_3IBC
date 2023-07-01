import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './components/app/App';
import Navbar from './components/navbar/Navbar';
import Tickets from './components/tickets/tickets';
import Ticket from './components/tickets/ticket';
import Profile from './components/profile/profile';
import { UserProvider } from './utils/user.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Tickets" element={<Tickets />} />
          <Route path="/Tickets/:index" element={<Ticket />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
