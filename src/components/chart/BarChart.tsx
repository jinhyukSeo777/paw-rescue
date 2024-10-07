import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { TABLET } from "../../utils/size";

const Container = styled.div`
  width: 50%;
  @media (max-width: ${TABLET}) {
    width: 100%;
    margin: 5rem 0;
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

const BarChart = ({ data }: IProps) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

  return (
    <Container>
      <Bar
        data={data}
        options={{
          indexAxis: "y",
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
              display: false, //범례 표시
            },
          },
        }}
      />
    </Container>
  );
};

export default BarChart;
