import React from "react";

const AddTest = ({ formData, handleChange, handleSubmit, setShowTest }) => {
  return (
    <section className="add-patient">
      <h2>Dodaj Badanie: </h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nazwa">Nazwa badania:</label>
        <input
          type="text"
          id="nazwa"
          name="nazwa"
          value={formData.nazwa}
          onChange={handleChange}
          required
        />
        <button type="submit">Dodaj</button>
        <button type="button" onClick={() => setShowTest(false)}>
          Anuluj
        </button>
      </form>
    </section>
  );
};

export default AddTest;
