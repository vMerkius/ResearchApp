import { getPatients } from "../server";
import { useEffect, useState } from "react";
import "./patients.css";

const TablePatients = ({ patients, setPatients }) => {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortData = (column) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...patients].sort((a, b) => {
      if (a[column] < b[column]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setPatients(sortedData);
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => sortData("id")}>
            Id {sortColumn === "id" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => sortData("imie")}>
            Imię {sortColumn === "imie" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => sortData("nazwisko")}>
            Nazwisko{" "}
            {sortColumn === "nazwisko" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => sortData("adres")}>
            Adres {sortColumn === "adres" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td className="id">{patient.id}</td>
            <td className="name">{patient.imie}</td>
            <td className="surname">{patient.nazwisko}</td>
            <td className="adres">{patient.adres}</td>
            <td className="buttons">
              <button className="edit-btn">Edytuj</button>
              <button className="remove-btn">Usuń</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePatients;
