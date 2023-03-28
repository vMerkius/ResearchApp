import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const GenderChart = ({ patients }) => {
  const woman = patients.reduce((acc, patient) => {
    return patient.plec === "K" ? acc + 1 : acc;
  }, 0);

  const man = patients.length - woman;

  const data = {
    labels: ["Kobiety", "Mężczyźni"],
    datasets: [
      {
        label: "Płeć",
        data: [woman, man],
        backgroundColor: ["pink", "lightblue"],
      },
    ],
  };

  return (
    <div className="diagram">
      <h3>Podział płci w projektach</h3>
      <Pie key="chart-project" data={data} />
    </div>
  );
};

export default GenderChart;
