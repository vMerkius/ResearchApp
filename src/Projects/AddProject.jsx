import React, { useState } from "react";
import { addProject } from "../server";

const AddProject = ({ onAddPatient }) => {
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
        onAddPatient(formData);
      }
    });
  };

  return (
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
      <button type="submit">Dodaj Projekt</button>
    </form>
  );
};

export default AddProject;
