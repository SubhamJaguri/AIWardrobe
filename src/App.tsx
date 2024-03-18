import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { VirtualDressingRoom } from "./containers/dressingroom";
import { NavBar } from "./components/nav-bar"; // Import NavBar here
import UploadGarmentPage from "./containers/upload-garment-form";
import GarmentList from "./containers/garment-list";

function App() {
  return (
    <Router>
      <NavBar />
      <br></br>
      <div>
        <Routes>
          <Route path="/upload-garment" element={<UploadGarmentPage />} />
          <Route path="/garment-list" element={<GarmentList />} />
          <Route path="/" element={<VirtualDressingRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
