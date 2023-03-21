import { useEffect, useState } from "react";
import { getProjects } from "../server";
import TableProjects from "./TableProjects";

import "./projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [findProject, setFindProject] = useState("");

  const updateProjectsList = () => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania pacjentów:", error);
      });
  };

  useEffect(() => {
    updateProjectsList();
  }, []);
  return (
    <main>
      <TableProjects
        projects={filteredProjects}
        setProjects={setProjects}
      ></TableProjects>
    </main>
  );
};

export default Projects;
