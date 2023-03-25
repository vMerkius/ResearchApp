import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const ChartProject = ({ agreements }) => {
  const result = agreements.reduce((acc, agreement) => {
    return agreement.zgoda ? acc + 1 : acc;
  }, 0);

  const data = {
    labels: ["Zaakceptowane", "Niezaakceptowane"],
    datasets: [
      {
        label: "Zgody",
        data: [result, agreements.length - result],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };
  return (
    <div>
      <Pie key="chart-project" data={data} />
    </div>
  );
};

export default ChartProject;
