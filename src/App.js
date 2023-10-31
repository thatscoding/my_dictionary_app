import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<h1>No Page Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
