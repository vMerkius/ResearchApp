import { useState } from "react";

const FindProject = ({ findProject }) => {
  const [findName, setFindName] = useState("");

  function handleChange(e) {
    setFindName(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    findProject(findName);
  };
  return (
    <>
      <h2>Wyszukaj po nazwie projektu:</h2>
      <label htmlFor="finder">Nazwa:</label>
      <input
        type="text"
        id="finder"
        name="finder"
        onChange={handleChange}
      ></input>
      <button type="button" onClick={handleSubmit}>
        Find
      </button>
    </>
  );
};

export default FindProject;
