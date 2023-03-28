import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const AgreementChart = ({ projects }) => {
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
  const data = {
    labels: ["Wyrażone zgody", "Nie wyrażone zgody"],
    datasets: [
      {
        label: "Zgody",
        data: [agreed, disagreed],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  return (
    <div className="diagram">
      <h3>Wyrażone zgody na udział</h3>
      <Pie key="chart-project" data={data} />
    </div>
  );
};

export default AgreementChart;
