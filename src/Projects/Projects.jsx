import { useEffect, useState } from "react";
import { getProjects, getPeopleInProject } from "../server";
import TableProjects from "./TableProjects";

import "./projects.css";
import AddProject from "./AddProject";
import FindProject from "./FindProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [connections, setConnections] = useState([]);
  const [findProject, setFindProject] = useState("");

  //wczytanie projektow przy mountingu komponentu
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
  //przefiltrowanie tablicy projektow, z wybrana nazwa, wysylanej do komponentu TableProjects
  useEffect(() => {
    if (findProject !== "") {
      const filtered = projects.filter((project) => {
        return project.nazwa.toLowerCase().includes(findProject.toLowerCase());
      });
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [findProject, projects]);

  return (
    <main>
      <FindProject findProject={setFindProject}></FindProject>
      <TableProjects
        projects={filteredProjects}
        setProjects={setProjects}
      ></TableProjects>
      <AddProject onAddPatient={updateProjectsList} />
    </main>
  );
};

export default Projects;
