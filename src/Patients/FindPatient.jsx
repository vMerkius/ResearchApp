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
    <section className="find-patient">
      <h2>Wyszukaj po nazwisku:</h2>
      <form>
        <label htmlFor="finder">Nazwisko:</label>
        <input
          type="text"
          id="finder"
          name="finder"
          onChange={handleChange}
        ></input>
        <button type="button" onClick={handleSubmit}>
          Szukaj
        </button>
      </form>
    </section>
  );
};

export default FindPatient;
