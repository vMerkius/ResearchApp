import React, { useState } from "react";
import { addOrder } from "../../server";

const AddOrder = ({ onAddOrder, projectId, patientId, setShowAdd }) => {
  const [formData, setFormData] = useState({
    pacjentId: Number(patientId),
    projektId: Number(projectId),
    dataZlecenia: "",
    status: "",
    badania: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = addOrder(formData).then(() => {
      if (order) {
        setFormData({ dataZlecenia: "", status: "" });
        setShowAdd(false);
        onAddOrder(formData);
      }
    });
  };

  return (
    <section className="add-patient">
      <h2>Dodaj Zlecenie: </h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="dataZlecenia">Data:</label>
        <input
          type="text"
          id="dataZlecenia"
          name="dataZlecenia"
          value={formData.dataZlecenia}
          onChange={handleChange}
          required
        />
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        />
        <button type="submit">Dodaj</button>
      </form>
    </section>
  );
};

export default AddOrder;
