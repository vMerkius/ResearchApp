import { deletePatient, updatePatient, updateProject } from "../../server";
import { useState } from "react";
import { Link } from "react-router-dom";

const TableProjectDetails = ({
  patients,
  setPatients,
  agreements,
  project,
  setChange,
  change,
}) => {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    imie: "",
    nazwisko: "",
    adres: "",
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

  //usuwanie pacjenta z projektu
  const handleDelete = async (id) => {
    const participantsWithoutDeleted = project.uczestnicy.filter(
      (patient) => patient.pacjentId !== id
    );
    const ids = participantsWithoutDeleted.map(
      (participan) => participan.pacjentId
    );
    let projectNew = project;
    projectNew.uczestnicy = participantsWithoutDeleted;
    const updatedPatientData = await updateProject(projectNew);

    setPatients(patients.filter((p) => ids.includes(p.id)));
  };

  const handleEdit = async (patient) => {
    console.log(patient);
    let projectEditAgreement = project;
    projectEditAgreement.uczestnicy = project.uczestnicy.map((p) => {
      const patientAgreement = p;
      if (p.pacjentId == patient.id)
        patientAgreement.zgoda = !patientAgreement.zgoda;
      return patientAgreement;
    });
    const updatedPatientData = await updateProject(projectEditAgreement);
    setChange(!change);
  };

  //metoda odpowiedzialna za update pacjenta po wcisnieciu edytuj
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPatient = {
      id: formData.id,
      imie: formData.imie,
      nazwisko: formData.nazwisko,
      adres: formData.adres,
    };
    const updatedPatientData = await updatePatient(updatedPatient);
    setPatients(
      patients.map((p) =>
        p.id === updatedPatientData.id ? updatedPatientData : p
      )
    );
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
            <th>Zgoda </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayedPatients.map((patient) => (
            <tr
              key={patient.id}
              id={
                agreements.find((a) => a.id === patient.id)?.zgoda
                  ? "agreement-true"
                  : "agreement-false"
              }
            >
              <td className="id">{patient.id}</td>
              <td className="name">{patient.imie}</td>
              <td className="surname">
                {agreements.find((a) => a.id === patient.id)?.zgoda ? (
                  <Link
                    to={`/patients/${patient.id}/${project.id}`}
                    key={project.id}
                  >
                    {patient.nazwisko}
                  </Link>
                ) : (
                  <span>{patient.nazwisko}</span>
                )}
              </td>
              <td className="adres">{patient.adres}</td>
              <td className="aggreement">
                {agreements.map((agreement) => {
                  if (agreement.id === patient.id) {
                    return agreement.zgoda ? "Tak" : "Nie";
                  }
                })}
              </td>

              <td className="buttons-table">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(patient)}
                >
                  Zmień zgodę
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

export default TableProjectDetails;
