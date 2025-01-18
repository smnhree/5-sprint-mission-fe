import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Main.css";
import App from "./common/App.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ItemsPage from "./pages/ItemsPage/ItemsPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
