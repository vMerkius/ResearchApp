import Summary from "./Summary/Summary";
import Patients from "./Patients/Patients";
import Projects from "./Projects/Projects";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css";
import Header from "./Header/Header";
import ProjectDetails from "./Projects/ProjectDetails/ProjectDetails";
import PatientDetails from "./Patients/PatientDetails/PatientDetails";
import PatientDetailsInProject from "./Patients/PatientDetails/PatientDetailsInProject";
const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route
          path="/patients/:idPatient/:idProject"
          element={<PatientDetailsInProject />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
