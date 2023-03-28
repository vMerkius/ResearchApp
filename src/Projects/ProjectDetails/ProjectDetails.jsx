import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FindPatient from "../../Patients/FindPatient";
import { getPatients, getSingleProject } from "../../server";
import AddPatientToProject from "./AddPatientToProject";
import ChartProject from "./ChartsProject";
import TableProjectDetails from "./TableProjectDetails";

const ProjectDetails = () => {
  const [project, setProject] = useState([]);
  const [patients, setPatients] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [patientsInProject, setPatientsInProject] = useState([]);
  const [patientsInProjectFiltered, setPatientsInProjectFiltered] = useState(
    []
  );
  const [patientsNotInProjectFiltered, setPatientsNotInProjectFiltered] =
    useState([]);
  const [patientsNotInProject, setPatientsNotInProject] = useState([]);
  const [change, setChange] = useState(false);
  const [showPatients, setShowPatients] = useState(false);
  const [findSurname, setFindSurname] = useState("");
  const [findSurnameAddPatient, setFindSurnameAddPatient] = useState("");
  const [showFind, setshowFind] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getSingleProject(id).then((data) => {
      setProject(data);
    });
    getPatients().then((data) => {
      setPatients(data);
    });
  }, []);
  useEffect(() => {
    if (project.uczestnicy && patients) {
      const allAgreements = project.uczestnicy.map((patient) => {
        const id = patient.pacjentId;
        const agreement = patient.zgoda;
        return { id: id, zgoda: agreement };
      });

      // wyszukuje dane pacjentow po tym jak przeszuka uczestnikow konkretnego projektu
      const patientsIds = project.uczestnicy.map(
        (patient) => patient.pacjentId
      );
      const patientsInProject_ = patients.filter((patient) =>
        patientsIds.includes(patient.id)
      );

      //zapisuje pacjentow poza projektem by wywolac tylko ich przy dodawaniu pacjentow do projektuu
      const patientsNotInProject_ = patients.filter(
        (patient) => !patientsIds.includes(patient.id)
      );
      setPatientsInProject(patientsInProject_);
      setAgreements(allAgreements);
      setPatientsNotInProject(patientsNotInProject_);
    }
  }, [project, patients, change]);
  //szukanie w tablicy pacjentow projektu
  useEffect(() => {
    if (findSurname !== "") {
      const filtered = patientsInProject.filter((patient) => {
        return patient.nazwisko
          .toLowerCase()
          .includes(findSurname.toLowerCase());
      });
      setPatientsInProjectFiltered(filtered);
    } else {
      setPatientsInProjectFiltered(patientsInProject);
    }
  }, [findSurname, patientsInProject]);

  //szukanie w tablicy przy dodawaniu pacjenta do projektu
  useEffect(() => {
    if (findSurnameAddPatient !== "") {
      const filtered = patientsNotInProject.filter((patient) => {
        return patient.nazwisko
          .toLowerCase()
          .includes(findSurnameAddPatient.toLowerCase());
      });
      setPatientsNotInProjectFiltered(filtered);
    } else {
      setPatientsNotInProjectFiltered(patientsNotInProject);
    }
  }, [findSurnameAddPatient, patientsNotInProject]);

  return (
    <main>
      <h1>{project.nazwa}</h1>
      <ChartProject agreements={agreements}></ChartProject>
      <div className="buttons">
        <button
          className="button-add"
          onClick={() => {
            setShowPatients(!showPatients);
          }}
        >
          Dodaj pacjenta
        </button>
        <button
          className="button-find"
          onClick={() => {
            setshowFind(!showFind);
          }}
        >
          Znajdź pacjenta
        </button>
      </div>
      {showPatients && (
        <>
          <FindPatient findPatient={setFindSurnameAddPatient}></FindPatient>
          <AddPatientToProject
            patients={patientsNotInProjectFiltered}
            setProject={setProject}
            project={project}
            setPatients={setPatientsNotInProjectFiltered}
          ></AddPatientToProject>
        </>
      )}
      {showFind && <FindPatient findPatient={setFindSurname}></FindPatient>}
      <TableProjectDetails
        patients={patientsInProjectFiltered}
        setPatients={setPatientsInProject}
        agreements={agreements}
        project={project}
        change={change}
        setChange={setChange}
      ></TableProjectDetails>
    </main>
  );
};

export default ProjectDetails;
