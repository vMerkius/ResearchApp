import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const TestsChart = ({ orders, setTests }) => {
  let testsAll = 0;
  const tests = {};
  const testsNotDone = {};
  orders.forEach((order) => {
    order.badania.forEach((badanie) => {
      if (badanie.wynik !== "") {
        testsAll += 1;
        if (badanie.nazwa in tests) {
          tests[badanie.nazwa] += 1;
        } else {
          tests[badanie.nazwa] = 1;
        }
      } else {
        if (badanie.nazwa in testsNotDone) {
          testsNotDone[badanie.nazwa] += 1;
        } else {
          testsNotDone[badanie.nazwa] = 1;
        }
      }
    });
    setTests(testsAll);
  });

  const data = {
    labels: Object.keys(tests),
    datasets: [
      {
        label: "Ilość wykonanych badań",
        data: Object.values(tests),
      },
    ],
  };
  const data_2 = {
    labels: Object.keys(testsNotDone),
    datasets: [
      {
        label: "Ilość niewykonanych badań",
        data: Object.values(testsNotDone),
      },
    ],
  };
  return (
    <div className="diagram-container">
      <div className="diagram">
        <h3>Ilość badań- wykonnaych</h3>
        <Bar key="chart-project" data={data} />
      </div>
      <div className="diagram">
        <h3>Ilość badań- niewykonanych</h3>
        <Bar key="chart-project_2" data={data_2} />
      </div>
    </div>
  );
};

export default TestsChart;
