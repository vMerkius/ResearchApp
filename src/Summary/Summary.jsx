import { getOrders, getPatients, getProjects } from "../server";
import { useEffect, useState } from "react";
import ChartsSummary from "./ChartsSummary";

const Summary = () => {
  const [patients, setPatients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tests, setTests] = useState(0);

  useEffect(() => {
    getPatients()
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania projektów:", error);
      });
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania pacjentów:", error);
      });
    getOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania zleceń:", error);
      });
  }, []);
  return (
    <>
      <h1>Podsumowanie:</h1>
      <h2>Pacjenci: {patients.length}</h2>
      <h2>Projekty: {projects.length}</h2>
      <h2>Badania wykonane: {tests}</h2>
      <ChartsSummary
        projects={projects}
        patients={patients}
        orders={orders}
        setTests={setTests}
      ></ChartsSummary>
    </>
  );
};

export default Summary;
