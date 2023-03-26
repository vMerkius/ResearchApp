import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteOrder, getOrders, updateOrder } from "../../server";
import AddOrder from "./AddOrder";
import EditOrder from "./EditOrder";

const PatientDetailsInProject = () => {
  const [patientOrders, setPatientOrders] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    pacjentId: 0,
    projektId: 0,
    dataZlecenia: "",
    status: "",
    badania: [],
  });

  const { idPatient, idProject } = useParams();
  const updateOrdersList = () => {
    getOrders().then((data) => {
      const allPatientOrders = data.filter(
        (order) =>
          order.pacjentId == Number(idPatient) &&
          order.projektId == Number(idProject)
      );
      setPatientOrders(allPatientOrders);
    });
  };
  useEffect(() => {
    updateOrdersList();
  }, [idPatient, idProject]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEdit = (order) => {
    setFormData({
      id: order.id,
      pacjentId: order.pacjentId,
      projektId: order.projektId,
      dataZlecenia: order.dataZlecenia,
      status: order.status,
      badania: order.badania,
    });
    setShowEdit(!showEdit);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      id: formData.id,
      pacjentId: formData.pacjentId,
      projektId: formData.projektId,
      dataZlecenia: formData.dataZlecenia,
      status: formData.status,
      badania: formData.badania,
    };
    console.log(updatedOrder.id);
    const updatedOrdertData = await updateOrder(updatedOrder);
    setPatientOrders(
      patientOrders.map((p) =>
        p.id === updatedOrdertData.id ? updatedOrdertData : p
      )
    );
    setFormData({
      id: 0,
      pacjentId: 0,
      projektId: 0,
      dataZlecenia: "",
      status: "",
      badania: [],
    });
    setShowEdit(false);
  };
  const handleDelete = (order) => {
    if (order.status !== "zakończone") {
      deleteOrder(order.id).then(() => {
        setPatientOrders(patientOrders.filter((o) => o.id !== order.id));
      });
    }
  };

  return (
    <main>
      <h1>Lista zleceń</h1>
      <button
        className="button-add"
        onClick={() => {
          setShowAdd(!showAdd);
        }}
      >
        Dodaj zlecenie
      </button>
      {showEdit && (
        <EditOrder
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setShowEdit={setShowEdit}
        />
      )}
      <div className="patient-forms">
        {showAdd && (
          <AddOrder
            onAddOrder={updateOrdersList}
            projectId={idProject}
            patientId={idPatient}
            setShowAdd={setShowAdd}
            className="find-patient"
          />
        )}
      </div>
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
                  {order.badania[0]
                    ? order.badania.map((badanie) => (
                        <li key={badanie.nazwa}>{badanie.nazwa}</li>
                      ))
                    : ""}
                </ul>
              </td>
              <td>
                <ul>
                  {order.badania[0]
                    ? order.badania.map((badanie) => (
                        <li key={badanie.nazwa}>
                          {badanie.wynik ? badanie.wynik : "-"}
                        </li>
                      ))
                    : ""}
                </ul>
              </td>
              <td className="buttons-table">
                <button className="edit-btn" onClick={() => handleEdit(order)}>
                  Edytuj
                </button>
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
