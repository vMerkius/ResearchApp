import React from "react";

const EditResult = ({ formData, handleChange, handleSubmit, setShowTest }) => {
  return (
    <section className="edit-patient">
      <h2>Edytuj wynik</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="wynik">Wynik:</label>
        <input
          type="text"
          id="wynik"
          name="wynik"
          value={formData.wynik}
          onChange={handleChange}
          required
        />
        <button type="submit">Edytuj wynik</button>
        <button type="button" onClick={() => setShowTest(false)}>
          Anuluj
        </button>
      </form>
    </section>
  );
};

export default EditResult;
