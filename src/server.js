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

export { getPatients, getProjects };
