import React from "react";

const EditPatient = ({ formData, handleChange, handleSubmit, setShowEdit }) => {
  return (
    <section className="edit-patient">
      <h2>Edytuj pacjenta</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imie">Imię:</label>
        <input
          type="text"
          id="imie"
          name="imie"
          value={formData.imie}
          onChange={handleChange}
          required
        />
        <label htmlFor="nazwisko">Nazwisko:</label>
        <input
          type="text"
          id="nazwisko"
          name="nazwisko"
          value={formData.nazwisko}
          onChange={handleChange}
          required
        />
        <label htmlFor="adres">Adres:</label>
        <input
          type="text"
          id="adres"
          name="adres"
          value={formData.adres}
          onChange={handleChange}
          required
        />
        <label htmlFor="plec">Plec:</label>
        <input
          type="text"
          id="plec"
          name="plec"
          value={formData.plec}
          onChange={handleChange}
          required
        />
        <label htmlFor="dataUrodzenia">Data urodzenia:</label>
        <input
          type="text"
          id="dataUrodzenia"
          name="dataUrodzenia"
          value={formData.dataUrodzenia}
          onChange={handleChange}
          required
        />
        <button type="submit">Edytuj pacjenta</button>
        <button type="button" onClick={() => setShowEdit(false)}>
          Anuluj
        </button>
      </form>
    </section>
  );
};

export default EditPatient;
