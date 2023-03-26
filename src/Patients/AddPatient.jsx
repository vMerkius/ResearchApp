import React, { useState } from "react";
import { addPatient } from "../server";

const AddPatient = ({ onAddPatient }) => {
  const [formData, setFormData] = useState({
    imie: "",
    nazwisko: "",
    adres: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patient = addPatient(formData).then(() => {
      if (patient) {
        setFormData({
          imie: "",
          nazwisko: "",
          adres: "",
          plec: "",
          dataUrodzenia: "",
        });
        onAddPatient(formData);
      }
    });
  };

  return (
    <section className="add-patient">
      <h2>Dodaj Pacjenta</h2>
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
        <button type="submit">Dodaj</button>
      </form>
    </section>
  );
};

export default AddPatient;
