import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AhnrosApp from "./AhnrosApp";
import { BuildPage, LeadPage } from "./AhnrosPages";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AhnrosApp />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/lead" element={<LeadPage />} />
        <Route path="*" element={<AhnrosApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
