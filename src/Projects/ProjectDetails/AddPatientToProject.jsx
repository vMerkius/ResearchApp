import { updateProject } from "../../server";
import { useState } from "react";

const AddPatientToProject = ({ patients, setProject, project }) => {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
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

  const handleAdd = (patient) => {
    let projectWithNewPatient = project;
    const newData = { pacjentId: patient.id, zgoda: true };
    projectWithNewPatient.uczestnicy.push(newData);
    const updatedProject = updateProject(projectWithNewPatient);
    setProject(updatedProject);
    window.location.reload();
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

    //setPatients(sortedData);
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  return (
    <>
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
              <td className="surname">{patient.nazwisko}</td>
              <td className="adres">{patient.adres}</td>
              <td className="buttons-table">
                <button className="edit-btn" onClick={() => handleAdd(patient)}>
                  Dodaj
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

export default AddPatientToProject;
