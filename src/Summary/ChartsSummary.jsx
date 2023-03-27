import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const ChartsSummary = ({ projects, patients, orders, setTests }) => {
  const aggreementsArray = projects.map((project) => {
    return project.uczestnicy.reduce((acc, patient) => {
      return patient.zgoda ? acc + 1 : acc;
    }, 0);
  });
  const agreed = aggreementsArray.reduce((acc, current) => acc + current, 0);
  const disagreed = aggreementsArray.reduce(
    (acc, current) => (current ? acc : acc + 1),
    0
  );
  const woman = patients.reduce((acc, patient) => {
    return patient.plec === "K" ? acc + 1 : acc;
  }, 0);

  const man = patients.length - woman;

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
  });
  setTests(testsAll);

  const data = {
    labels: ["Wyrazili zgodę", "Nie wyrazili zgody"],
    datasets: [
      {
        label: "Zgody",
        data: [agreed, disagreed],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };
  const data_2 = {
    labels: ["Kobiety", "Mężczyźni"],
    datasets: [
      {
        label: "Płeć",
        data: [woman, man],
        backgroundColor: ["pink", "lightblue"],
      },
    ],
  };
  const data_3 = {
    labels: Object.keys(tests),
    datasets: [
      {
        label: "Ilość wykonanych badań",
        data: Object.values(tests),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#2E8B57",
          "#FFA500",
        ],
      },
    ],
  };
  const data_4 = {
    labels: Object.keys(testsNotDone),
    datasets: [
      {
        label: "Ilość wykonanych badań",
        data: Object.values(testsNotDone),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#2E8B57",
          "#FFA500",
        ],
      },
    ],
  };
  return (
    <div className="diagram-container">
      <Pie key="chart-project" data={data} className="diagram" />
      <Pie key="chart-project_2" data={data_2} className="diagram" />
      <Pie key="chart-project_3" data={data_3} className="diagram" />
      <Pie key="chart-project_4" data={data_4} className="diagram" />
    </div>
  );
};

export default ChartsSummary;
