import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ProjectUsersChart = ({ projects }) => {
  const projectUsers = projects.map((project) => {
    return {
      name: project.nazwa,
      usersCount: project.uczestnicy.length,
    };
  });

  const data = {
    labels: projectUsers.map((project) => project.name),
    datasets: [
      {
        label: "Ilość uczestników",
        data: projectUsers.map((project) => project.usersCount),
      },
    ],
  };

  return (
    <div className="diagram">
      <h3>Ilość uczestników w projektach</h3>
      <Bar data={data} />
    </div>
  );
};

export default ProjectUsersChart;
