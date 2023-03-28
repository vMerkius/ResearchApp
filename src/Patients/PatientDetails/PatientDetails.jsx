import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjects, getSinglePatient } from "../../server";
import { Link } from "react-router-dom";

const PatientDetails = () => {
  const [projects, setProjects] = useState([]);
  const [patient, setPatient] = useState([]);
  const [patientsProjects, setPatientsProjects] = useState([]);
  const [patientsProjectsWihoutAgreement, setPatientsProjectsWithoutAgreement] =
    useState([]);

  const { id } = useParams();

  useEffect(() => {
    getSinglePatient(id).then((data) => {
      setPatient(data);
    });
    getProjects().then((data) => {
      setProjects(data);
    });
  }, [id]);
  useEffect(() => {
    // zwracanie projektow w ktorych pacjent bierze udzial i wyrazil zgode, i tych, w ktorych nie wyrazil
    if (projects && patient) {
      const projectsWithPatient = projects.filter((project) =>
        project.uczestnicy.some(
          (participant) =>
            participant.pacjentId === patient.id && participant.zgoda === true
        )
      );
      const projectsWithPatientWithoutAgreement = projects.filter((project) =>
        project.uczestnicy.some(
          (participant) =>
            participant.pacjentId === patient.id && participant.zgoda === false
        )
      );
      setPatientsProjects(projectsWithPatient);
      setPatientsProjectsWithoutAgreement(projectsWithPatientWithoutAgreement);
    }
  }, [projects, patient]);

  return (
    <>
      {patientsProjects[0] ? (
        <main>
          <h2>
            Projekty pacjenta: {patient.imie} {patient.nazwisko}
          </h2>
          <div className="project-tiles">
            {patientsProjects.map((project) => (
              <Link
                className="link-project"
                to={`/patients/${id}/${project.id}`}
                key={project.id}
              >
                <div className="project-tile">
                  <h3>{project.nazwa}</h3>
                </div>
              </Link>
            ))}
            {patientsProjectsWihoutAgreement.map((project) => (
              <Link
                className="link-project"
                to={`/projects/${project.id}`}
                key={project.id}
              >
                <div className="project-tile no-agreement">
                  <h3>{project.nazwa}</h3>
                </div>
              </Link>
            ))}
          </div>
        </main>
      ) : (
        <main>
          <h2>Ten pacjent nie bierze jeszcze udziału w żadnym projekcie</h2>
        </main>
      )}
    </>
  );
};

export default PatientDetails;
