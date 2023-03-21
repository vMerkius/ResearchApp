import React from "react";
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
const getPeopleInProject = async () => {
  try {
    const res = await axios.get("http://localhost:8000/powiazania");
    const connections = res.data;
    return connections;
  } catch (error) {
    console.error("Błąd podczas pobierania powiazan:", error);
    return [];
  }
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
  getPeopleInProject,
};
