import { getPatients, getProjects } from "../server";
import { useEffect, useState } from "react";
import ChartsSummary from "./ChartsSummary";

const Summary = () => {
  const [patients, setPatients] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getPatients()
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania pacjentów:", error);
      });
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania pacjentów:", error);
      });
  }, []);
  return (
    <>
      <h1>Podsumowanie:</h1>
      <h2>Pacjenci: {patients.length}</h2>
      <h2>Projekty: {projects.length}</h2>
      <ChartsSummary projects={projects}></ChartsSummary>
    </>
  );
};

export default Summary;
