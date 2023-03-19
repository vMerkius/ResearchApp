import React, { useState } from "react";
import axios from "axios";

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
    try {
      const response = await axios.post(
        "http://localhost:8000/pacjenci",
        formData
      );
      console.log("Dodano pacjenta:", response.data);
      setFormData({ imie: "", nazwisko: "", adres: "" });

      onAddPatient(response.data);
      alert("Dodano pacjenta");
    } catch (error) {
      console.error("Błąd podczas dodawania pacjenta:", error);
    }
  };

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
      <button type="submit">Dodaj pacjenta</button>
    </form>
  );
};

export default AddPatient;
