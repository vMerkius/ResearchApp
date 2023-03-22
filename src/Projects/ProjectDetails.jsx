import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProject } from "../server";

const ProjectDetails = () => {
  const [project, setProject] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleProject(id).then((data) => {
      setProject(data);
    });
  }, []);
  return <h1>{project.nazwa}</h1>;
};

export default ProjectDetails;
