import { useEffect, useState } from "react";
import { getPatients } from "../server";

import FindPatient from "./FindPatient";
import AddPatient from "./AddPatient";
import TablePatients from "./TablePatients";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [findSurname, setFindSurname] = useState("");
  const [showFind, setshowFind] = useState(false);
  const [showAdd, setshowAdd] = useState(false);

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

  //wczytanie pacjentow przy mountingu komponentu
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
      <div className="buttons">
        <button
          className="button-find"
          onClick={() => {
            setshowFind(!showFind);
          }}
        >
          Znajdź pacjenta
        </button>
        <button
          className="button-add"
          onClick={() => {
            setshowAdd(!showAdd);
          }}
        >
          Dodaj pacjenta
        </button>
      </div>
      <div className="patient-forms">
        {showFind && (
          <FindPatient
            findPatient={setFindSurname}
            className="add-patient"
          ></FindPatient>
        )}
        {showAdd && (
          <AddPatient
            onAddPatient={updatePatientsList}
            className="find-patient"
          />
        )}
      </div>
      <TablePatients patients={filteredPatients} setPatients={setPatients} />
    </main>
  );
};

export default Patients;
