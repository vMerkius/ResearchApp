import { deletePatient, updatePatient } from "../server";
import { useEffect, useState } from "react";
import "./projects.css";

const TableProjects = ({ projects, setProjects }) => {
  console.log(projects);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    nazwaProjektu: "",
    opisProjektu: "",
    liczbaUczestnikow: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const paginate = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const displayedProjects = paginate(projects, currentPage, itemsPerPage);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDelete = (id) => {
    // deletePatient(id).then(() => {
    //   setProjects(projects.filter((project) => project.id !== id));
    // });
  };
  const handleEdit = (project) => {
    setFormData({
      id: project.id,
      nazwaProjektu: project.nazwaProjektu,
      opisProjektu: project.opisProjektu,
      liczbaUczestnikow: 0,
    });
    setShowEdit(!showEdit);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProject = {
      id: formData.id,
      nazwaProjektu: formData.nazwaProjektu,
      opisProjektu: formData.opisProjektu,
      liczbaUczestnikow: 0,
    };
    const updatedProjectData = await updatePatient(updatedProject);
    setProjects(
      projects.map((p) =>
        p.id === updatedProjectData.id ? updatedProjectData : p
      )
    );
    setFormData({ nazwaProjektu: "", opisProjektu: "", liczbaUczestnikow: 0 });
    setShowEdit(false);
  };
  const sortData = (column) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...projects].sort((a, b) => {
      if (a[column] < b[column]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setProjects(sortedData);
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
              Nazwa{" "}
              {sortColumn === "nazwaProjektu" &&
                (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => sortData("nazwisko")}>
              Opis{" "}
              {sortColumn === "opisProjektu" &&
                (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => sortData("adres")}>
              Liczba uczestnikow{" "}
              {sortColumn === "liczbaUczestnikow" &&
                (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayedProjects.map((project) => (
            <tr key={project.id}>
              <td className="id">{project.id}</td>
              <td className="name">{project.nazwa}</td>
              <td className="surname">{project.opis}</td>
              <td className="adres">{project.liczbaUczestnikow}</td>
              <td className="buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(project)}
                >
                  Edytuj
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleDelete(project.id)}
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
      {/* {showEdit && (
        <EditPatients
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setShowEdit={setShowEdit}
        />
      )} */}
    </>
  );
};

export default TableProjects;
