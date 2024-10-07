import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { TABLET } from "../../utils/size";

const Container = styled.div`
  width: 40%;
  @media (max-width: ${TABLET}) {
    width: 100%;
  }
`;

interface IProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

const DonutChart = ({ data }: IProps) => {
  ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

  return (
    <Container>
      <Doughnut
        data={data}
        options={{
          plugins: {
            tooltip: {
              enabled: true, //hover시 툴팁
              callbacks: {
                label: function (tooltipItem) {
                  const label = tooltipItem.label || "";
                  const value = tooltipItem.raw || 0;
                  return `${label}: ${value} 마리`;
                },
              },
            },
            legend: {
              labels: {
                padding: 10,
              },
            },
          },
        }}
      />
    </Container>
  );
};

export default DonutChart;
