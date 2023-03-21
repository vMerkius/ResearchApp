import React, { useState } from "react";

const EditProject = ({ formData, handleChange, handleSubmit, setShowEdit }) => {
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
      <label htmlFor="opis">Opis</label>
      <input
        type="text"
        id="opis"
        name="opis"
        value={formData.opis}
        onChange={handleChange}
        required
      />

      <button type="submit">Edytuj projekt</button>
      <button type="button" onClick={() => setShowEdit(false)}>
        Anuluj
      </button>
    </form>
  );
};

export default EditProject;
