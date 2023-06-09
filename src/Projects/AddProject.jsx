import React, { useState } from "react";
import { addProject } from "../server";

const AddProject = ({ onAddProject }) => {
  const [formData, setFormData] = useState({
    nazwa: "",
    opis: "",
    uczestnicy: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = addProject(formData).then(() => {
      if (project) {
        setFormData({ nazwa: "", opis: "" });
        onAddProject(formData);
        window.location.reload();
      }
    });
  };

  return (
    <section className="add-patient">
      <h2>Dodaj projekt:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nazwa">Nazwa:</label>
        <input
          type="text"
          id="nazwa"
          name="nazwa"
          value={formData.nazwa}
          onChange={handleChange}
          required
        />
        <label htmlFor="opis">Opis:</label>
        <input
          type="text"
          id="opis"
          name="opis"
          value={formData.opis}
          onChange={handleChange}
          required
        />
        <button type="submit">Dodaj</button>
      </form>
    </section>
  );
};

export default AddProject;
