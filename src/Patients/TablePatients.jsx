import { deletePatient, updatePatient } from "../server";
import { useState } from "react";
import EditPatients from "./EditPatients";
import { Link } from "react-router-dom";

const TablePatients = ({ patients, setPatients }) => {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    imie: "",
    nazwisko: "",
    adres: "",
    plec: "",
    dataUrodzenia: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(patients.length / itemsPerPage);

  const paginate = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  //tablica odpowiedzialna za zwrocenie jedynie pacjentow danej strony
  const displayedPatients = paginate(patients, currentPage, itemsPerPage);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDelete = (id) => {
    deletePatient(id).then(() => {
      setPatients(patients.filter((patient) => patient.id !== id));
    });
  };
  const handleEdit = (patient) => {
    setFormData({
      id: patient.id,
      imie: patient.imie,
      nazwisko: patient.nazwisko,
      adres: patient.adres,
      plec: patient.plec,
      dataUrodzenia: patient.dataUrodzenia,
    });
    setShowEdit(!showEdit);
  };

  //metoda odpowiedzialna za update pacjenta po wcisnieciu edytuj
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPatient = {
      id: formData.id,
      imie: formData.imie,
      nazwisko: formData.nazwisko,
      adres: formData.adres,
      plec: formData.plec,
      dataUrodzenia: formData.dataUrodzenia,
    };
    const updatedPatientData = await updatePatient(updatedPatient);
    setPatients(
      patients.map((p) =>
        p.id === updatedPatientData.id ? updatedPatientData : p
      )
    );
    setFormData({
      imie: "",
      nazwisko: "",
      adres: "",
      plec: "",
      dataUrodzenia: "",
    });
    setShowEdit(false);
  };

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
    <>
      {showEdit && (
        <EditPatients
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setShowEdit={setShowEdit}
        />
      )}
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
            <th>Płeć</th>
            <th>Data urodzenia</th>
            <th onClick={() => sortData("adres")}>
              Adres{" "}
              {sortColumn === "adres" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayedPatients.map((patient) => (
            <tr key={patient.id}>
              <td className="id">{patient.id}</td>
              <td className="name">{patient.imie}</td>

              <td className="surname">
                {" "}
                <Link to={`/patients/${patient.id}`}>{patient.nazwisko} </Link>
              </td>
              <td>{patient.plec}</td>
              <td>{patient.dataUrodzenia}</td>
              <td className="adres">{patient.adres}</td>
              <td className="buttons-table">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(patient)}
                >
                  Edytuj
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleDelete(patient.id)}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() =>
            setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span>
          Strona {currentPage} z {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage(
              currentPage < totalPages ? currentPage + 1 : currentPage
            )
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default TablePatients;
