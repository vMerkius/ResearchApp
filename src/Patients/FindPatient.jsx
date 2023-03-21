import { useState } from "react";

const FindPatient = ({ findPatient }) => {
  const [findSurname, setFindSurname] = useState([]);

  function handleChange(e) {
    setFindSurname(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    findPatient(findSurname);
  };
  return (
    <>
      <h2>Wyszukaj po nazwisku:</h2>
      <label htmlFor="finder">Nazwisko:</label>
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

export default FindPatient;
