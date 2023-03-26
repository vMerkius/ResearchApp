import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteOrder, getOrders } from "../../server";

const PatientDetailsInProject = () => {
  const [patientOrders, setPatientOrders] = useState([]);

  const { idPatient, idProject } = useParams();
  useEffect(() => {
    getOrders().then((data) => {
      const allPatientOrders = data.filter(
        (order) =>
          order.pacjentId == Number(idPatient) &&
          order.projektId == Number(idProject)
      );
      setPatientOrders(allPatientOrders);
    });
  }, [idPatient, idProject]);

  const handleDelete = (order) => {
    if (order.status !== "zakończone") {
      deleteOrder(order.id).then(() => {
        setPatientOrders(patientOrders.filter((o) => o.id !== order.id));
      });
    }
  };
  console.log(patientOrders);

  return (
    <main>
      <h1>Lista zleceń</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Data</th>
            <th>Status</th>
            <th>Badania</th>
            <th>Wynik</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patientOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.dataZlecenia}</td>
              <td>{order.status}</td>
              <td>
                <ul>
                  {order.badania.map((badanie) => (
                    <li key={badanie.nazwa}>{badanie.nazwa}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {order.badania.map((badanie) => (
                    <li key={badanie.nazwa}>
                      {badanie.wynik ? badanie.wynik : "-"}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="buttons-table">
                <button className="edit-btn">Edytuj</button>
                <button
                  className="remove-btn"
                  onClick={() => handleDelete(order)}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default PatientDetailsInProject;
