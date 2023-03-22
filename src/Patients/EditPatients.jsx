import React from "react";

const EditPatient = ({ formData, handleChange, handleSubmit, setShowEdit }) => {
  return (
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
      <button type="submit">Edytuj pacjenta</button>
      <button type="button" onClick={() => setShowEdit(false)}>
        Anuluj
      </button>
    </form>
  );
};

export default EditPatient;
