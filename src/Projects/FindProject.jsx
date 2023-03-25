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
      <section className="find-patient">
        <h2>Wyszukaj po nazwie projektu:</h2>
        <form>
          <label htmlFor="finder">Nazwa:</label>
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
    </>
  );
};

export default FindProject;
