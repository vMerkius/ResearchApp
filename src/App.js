import getPatients from "./server";
import { useEffect, useState } from "react";
import Summary from "./Summary";
import Patients from "./Patients/Patients";
import Projects from "./Projects/Projects";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
