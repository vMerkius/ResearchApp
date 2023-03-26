import React from "react";

const EditOrder = ({ formData, handleChange, handleSubmit, setShowEdit }) => {
  return (
    <section className="edit-patient">
      <h2>Edytuj zlecenie:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dataZlecenia">Nazwa:</label>
        <input
          type="text"
          id="dataZlecenia"
          name="dataZlecenia"
          value={formData.dataZlecenia}
          onChange={handleChange}
          required
        />
        <label htmlFor="status">Opis</label>
        <input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        />

        <button type="submit">Edytuj zlecenie</button>
        <button type="button" onClick={() => setShowEdit(false)}>
          Anuluj
        </button>
      </form>
    </section>
  );
};

export default EditOrder;
