import { useParams } from "react-router-dom";

const PatientDetailsInProject = () => {
  const { idPatient, idProject } = useParams();
  console.log(idPatient, idProject);
  return (
    <>
      <h1>tu</h1>
    </>
  );
};

export default PatientDetailsInProject;
