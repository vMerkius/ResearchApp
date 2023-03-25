import { useEffect, useState } from "react";
import { getProjects, getPeopleInProject } from "../server";
import TableProjects from "./TableProjects";

import AddProject from "./AddProject";
import FindProject from "./FindProject";

const Projects = () => {
  const [showFind, setshowFind] = useState(false);
  const [showAdd, setshowAdd] = useState(false);

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
      <div className="buttons">
        <button
          className="button-find"
          onClick={() => {
            setshowFind(!showFind);
          }}
        >
          Znajdź projekt
        </button>
        <button
          className="button-add"
          onClick={() => {
            setshowAdd(!showAdd);
          }}
        >
          Dodaj projekt
        </button>
      </div>
      <div className="project-forms">
        {showFind && <FindProject findProject={setFindProject}></FindProject>}
        {showAdd && <AddProject onAddPatient={updateProjectsList} />}
      </div>
      <TableProjects
        projects={filteredProjects}
        setProjects={setProjects}
      ></TableProjects>
    </main>
  );
};

export default Projects;
