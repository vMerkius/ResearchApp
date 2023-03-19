import getPatients from "./server";
import { useEffect, useState } from "react";
import Summary from "./Summary";
import Patients from "./Patients/Patients";

const App = () => {
  return (
    <>
      <Summary></Summary>
      <Patients></Patients>
    </>
  );
};

export default App;
