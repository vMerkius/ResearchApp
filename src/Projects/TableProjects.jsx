import { deletePatient, updatePatient } from "../server";
import { useEffect, useState } from "react";
import "./projects.css";
import EditProject from "./EditProject";
import { updateProject } from "../server";

const TableProjects = ({ projects, setProjects }) => {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    nazwa: "",
    opis: "",
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

  //tablica odpowiedzialna za zwrocenie jedynie projektow danej strony
  const displayedProjects = paginate(projects, currentPage, itemsPerPage);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDelete = (id) => {
    deletePatient(id).then(() => {
      setProjects(projects.filter((project) => project.id !== id));
    });
  };

  const handleEdit = (project) => {
    setFormData({
      id: project.id,
      nazwa: project.nazwa,
      opis: project.opis,
      liczbaUczestnikow: 0,
    });
    setShowEdit(!showEdit);
  };

  //metoda odpowiedzialna za update projektu po wcisnieciu edytuj
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProject = {
      id: formData.id,
      nazwa: formData.nazwa,
      opis: formData.opis,
      liczbaUczestnikow: 0,
    };
    const updatedProjectData = await updateProject(updatedProject);
    setProjects(
      projects.map((p) =>
        p.id === updatedProjectData.id ? updatedProjectData : p
      )
    );
    setFormData({ nazwa: "", opis: "", liczbaUczestnikow: 0 });
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
            <th onClick={() => sortData("nazwa")}>
              Nazwa{" "}
              {sortColumn === "nazwa" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => sortData("opis")}>
              Opis {sortColumn === "opis" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => sortData("liczbaUczestnikow")}>
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
      {showEdit && (
        <EditProject
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setShowEdit={setShowEdit}
        />
      )}
    </>
  );
};

export default TableProjects;
