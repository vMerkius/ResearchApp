import { useEffect, useState } from "react";
import { getPatients } from "../server";

import "./patients.css";
import FindPatient from "./FindPatient";
import AddPatient from "./AddPatient";
import TablePatients from "./TablePatients";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [findSurname, setFindSurname] = useState("");

  //wczytanie pacjentow przy mountingu komponentu
  const updatePatientsList = () => {
    getPatients()
      .then((data) => {
        setPatients(data);
        setFilteredPatients(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania pacjentów:", error);
      });
  };
  useEffect(() => {
    updatePatientsList();
  }, []);

  //przefiltrowanie tablicy pacjentow, z wybrana nazwa, wysylanej do komponentu TablePatients
  useEffect(() => {
    if (findSurname !== "") {
      const filtered = patients.filter((patient) => {
        return patient.nazwisko
          .toLowerCase()
          .includes(findSurname.toLowerCase());
      });
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [findSurname, patients]);
  return (
    <main>
      <div className="patient-forms">
        <FindPatient
          findPatient={setFindSurname}
          className="add-patient"
        ></FindPatient>
        <AddPatient
          onAddPatient={updatePatientsList}
          className="find-patient"
        />
      </div>
      <TablePatients patients={filteredPatients} setPatients={setPatients} />
    </main>
  );
};

export default Patients;
