import { getOrders, getPatients, getProjects } from "../server";
import { useEffect, useState } from "react";
import GenderChart from "./GenderChart";
import AgreementChart from "./AgreementChart";
import TestsChart from "./TestsChart";
import ProjectUsersChart from "./ProjectUsersChart";

const Summary = () => {
  const [patients, setPatients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tests, setTests] = useState(0);

  useEffect(() => {
    getPatients().then((data) => {
      setPatients(data);
    });

    getProjects().then((data) => {
      setProjects(data);
    });

    getOrders().then((data) => {
      setOrders(data);
    });
  }, []);
  return (
    <main className="summary">
      <h1>Podsumowanie:</h1>
      <div className="stats">
        <div className="data">
          <h2>Pacjenci: {patients.length}</h2>
          <h2>Projekty: {projects.length}</h2>
        </div>
        <div className="diagram-container">
          <GenderChart patients={patients}></GenderChart>
          <AgreementChart projects={projects}></AgreementChart>
          <ProjectUsersChart projects={projects}></ProjectUsersChart>
        </div>
      </div>
      <div className="stats">
        <div className="data">
          <h2>Badania wykonane: {tests}</h2>
        </div>

        <TestsChart
          projects={projects}
          patients={patients}
          orders={orders}
          setTests={setTests}
        ></TestsChart>
      </div>
    </main>
  );
};

export default Summary;
