import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteOrder, getOrders, updateOrder } from "../../server";
import AddOrder from "./AddOrder";
import AddTest from "./AddTest";
import EditOrder from "./EditOrder";
import EditResult from "./EditResult";

const PatientDetailsInProject = () => {
  const [patientOrders, setPatientOrders] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showAddTest, setShowAddTest] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    pacjentId: 0,
    projektId: 0,
    dataZlecenia: "",
    status: "",
    badania: [],
  });
  const [testFormData, setTestFormData] = useState({
    nazwa: "",
    wynik: "",
  });

  const { idPatient, idProject } = useParams();
  const updateOrdersList = () => {
    getOrders().then((data) => {
      const allPatientOrders = data.filter(
        (order) =>
          order.pacjentId === Number(idPatient) &&
          order.projektId === Number(idProject)
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
  const handleChangeTest = (e) => {
    setTestFormData({ ...testFormData, [e.target.name]: e.target.value });
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

  const handleResult = (result, order) => {
    setFormData({
      id: order.id,
      pacjentId: order.pacjentId,
      projektId: order.projektId,
      dataZlecenia: order.dataZlecenia,
      status: order.status,
      badania: order.badania,
    });
    setTestFormData({ nazwa: result.nazwa, wynik: result.wynik });
  };
  const handleAdd = (order) => {
    setFormData({
      id: order.id,
      pacjentId: order.pacjentId,
      projektId: order.projektId,
      dataZlecenia: order.dataZlecenia,
      status: order.status,
      badania: order.badania,
    });
  };
  const handleSubmitTest = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      id: formData.id,
      pacjentId: formData.pacjentId,
      projektId: formData.projektId,
      dataZlecenia: formData.dataZlecenia,
      status: formData.status,
      badania: formData.badania,
    };
    const updatedResults = updatedOrder.badania.map((result) => {
      if (result.nazwa === testFormData.nazwa)
        result.wynik = testFormData.wynik;
    });

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
    setTestFormData({
      nazwa: "",
      wynik: "",
    });
    setShowResult(false);
  };
  const handleSubmitAddTest = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      id: formData.id,
      pacjentId: formData.pacjentId,
      projektId: formData.projektId,
      dataZlecenia: formData.dataZlecenia,
      status: formData.status,
      badania: formData.badania,
    };
    console.log(updatedOrder);

    updatedOrder.badania.push(testFormData);
    console.log(updatedOrder);
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
    setTestFormData({
      nazwa: "",
      wynik: "",
    });
    setShowAddTest(false);
  };
  const handleDelete = (order) => {
    if (order.status !== "zakończone") {
      deleteOrder(order.id).then(() => {
        setPatientOrders(patientOrders.filter((o) => o.id !== order.id));
      });
    }
  };
  const handleDeleteTest = async (order, test) => {
    const updatedOrder = order;
    const updatedTests = updatedOrder.badania.filter(
      (t) => t.nazwa !== test.nazwa
    );
    updatedOrder.badania = updatedTests;
    const updatedOrdertData = await updateOrder(updatedOrder);
    setPatientOrders(
      patientOrders.map((p) =>
        p.id === updatedOrdertData.id ? updatedOrdertData : p
      )
    );
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
      {/* //kkk */}
      {showAddTest && (
        <AddTest
          formData={testFormData}
          handleChange={handleChangeTest}
          setShowTest={setShowAddTest}
          handleSubmit={handleSubmitAddTest}
        />
      )}
      {showResult && (
        <EditResult
          formData={testFormData}
          handleChange={handleChangeTest}
          setShowTest={setShowResult}
          handleSubmit={handleSubmitTest}
        ></EditResult>
      )}
      {patientOrders[0] ? (
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
                      ? order.badania.map((test) => (
                          <li key={test.nazwa}>
                            {test.nazwa}
                            <button
                              onClick={() => {
                                handleDeleteTest(order, test);
                              }}
                              className="delete-button"
                            >
                              X
                            </button>
                          </li>
                        ))
                      : ""}
                  </ul>
                  <button
                    onClick={() => {
                      setShowAddTest(!showAddTest);
                      handleAdd(order);
                    }}
                    className="add-button"
                  >
                    +
                  </button>
                </td>
                <td>
                  <ul>
                    {order.badania[0]
                      ? order.badania.map((test) => (
                          <li key={test.nazwa}>
                            <div
                              onClick={() => {
                                setShowResult(!showResult);
                                handleResult(test, order);
                              }}
                            >
                              {test.wynik ? test.wynik : "-"}
                            </div>
                          </li>
                        ))
                      : ""}
                  </ul>
                </td>
                <td className="buttons-table">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(order)}
                  >
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
      ) : (
        <h2>Ten pacjent nie ma jeszcze zleceń</h2>
      )}
    </main>
  );
};

export default PatientDetailsInProject;
