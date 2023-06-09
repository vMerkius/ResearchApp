import axios from "axios";

const getPatients = async () => {
  try {
    const res = await axios.get("http://localhost:8000/pacjenci");
    const patients = res.data;
    return patients;
  } catch (error) {
    console.error("Błąd podczas pobierania pacjentów:", error);
    return [];
  }
};

const addPatient = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/pacjenci",
      formData
    );
    console.log("Dodano pacjenta:", response.data);
    alert("Dodano pacjenta");
    return formData;
  } catch (error) {
    console.error("Błąd podczas dodawania pacjenta:", error);
  }
};

const deletePatient = (id) => {
  return axios
    .delete(`http://localhost:8000/projekty/${id}`)
    .then((res) => res.data);
};

const updatePatient = (patient) => {
  return axios
    .put(`http://localhost:8000/pacjenci/${patient.id}`, patient)
    .then((res) => res.data);
};

const getProjects = async () => {
  try {
    const res = await axios.get("http://localhost:8000/projekty");
    const projects = res.data;
    return projects;
  } catch (error) {
    console.error("Błąd podczas pobierania projektów:", error);
    return [];
  }
};

const getSingleProject = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8000/projekty/${id}`);
    const project = res.data;
    return project;
  } catch (error) {
    console.error("Błąd podczas pobierania projektu:", error);
    return [];
  }
};
const getSinglePatient = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8000/pacjenci/${id}`);
    const patient = res.data;
    return patient;
  } catch (error) {
    console.error("Błąd podczas pobierania pacjenta:", error);
    return [];
  }
};

const addProject = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/projekty",
      formData
    );
    console.log("Dodano projekt:", response.data);
    alert("Dodano projekt");
    return formData;
  } catch (error) {
    console.error("Błąd podczas dodawania projektu:", error);
  }
};
const deleteProject = (id) => {
  return axios
    .delete(`http://localhost:8000/projekty/${id}`)
    .then((res) => res.data);
};

const updateProject = (project) => {
  return axios
    .put(`http://localhost:8000/projekty/${project.id}`, project)
    .then((res) => res.data);
};

const deletePatientFromProject = async (id, projectId) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/projekty/${projectId}/pacjenci/${id}`
    );
    console.log("Usunięto pacjenta z projektu:", response.data);
    alert("Usunięto pacjenta z projektu");
  } catch (error) {
    console.error("Błąd podczas usuwania pacjenta:", error);
  }
};

const getOrders = async () => {
  try {
    const res = await axios.get("http://localhost:8000/zlecenia");
    const orders = res.data;
    return orders;
  } catch (error) {
    console.error("Błąd podczas pobierania zleceń:", error);
    return [];
  }
};

const deleteOrder = (id) => {
  return axios
    .delete(`http://localhost:8000/zlecenia/${id}`)
    .then((res) => res.data);
};
const addOrder = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/zlecenia",
      formData
    );
    console.log("Dodano zlecenie:", response.data);
    alert("Dodano zlecenie");
    return formData;
  } catch (error) {
    console.error("Błąd podczas dodawania zlecenie:", error);
  }
};
const updateOrder = (order) => {
  return axios
    .put(`http://localhost:8000/zlecenia/${order.id}`, order)
    .then((res) => res.data);
};

export {
  getPatients,
  getProjects,
  addPatient,
  deletePatient,
  updatePatient,
  addProject,
  deleteProject,
  updateProject,
  getSingleProject,
  deletePatientFromProject,
  getSinglePatient,
  getOrders,
  deleteOrder,
  addOrder,
  updateOrder,
};
