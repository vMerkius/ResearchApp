import { useEffect, useState } from "react";
import { getPatients } from "../server";

import "./patients.css";
import AddPatient from "./AddPatient";
import TablePatients from "./TablePatients";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  const updatePatientsList = () => {
    getPatients()
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania pacjentów:", error);
      });
  };

  useEffect(() => {
    updatePatientsList();
  }, []);
  return (
    <main>
      <TablePatients patients={patients} setPatients={setPatients} />
      <AddPatient onAddPatient={updatePatientsList} />
    </main>
  );
};

export default Patients;
