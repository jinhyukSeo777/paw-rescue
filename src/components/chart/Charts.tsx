import styled from "styled-components";
import { CHART_COLOR, MAIN_COLOR } from "../../utils/color";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import { TABLET } from "../../utils/size";
import { fetchAllData } from "../../utils/fetchData";

const Container = styled.section`
  width: 100%;
  height: 50rem;
  margin: 5rem 0;
`;

const H2 = styled.h2`
  span {
    font-size: 2rem;
    margin: 0 0.2rem;
    line-height: 2.8rem;
    &:first-child {
      display: block;
    }
    &:nth-child(2) {
      color: ${MAIN_COLOR};
    }
  }
`;

const ChartsArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  @media (max-width: ${TABLET}) {
    display: block;
  }
`;

const STATE = ["보호중", "자연사", "반환", "입양", "방사", "기증", "안락사"];
export const LEGION = [
  "수원시",
  "성남시",
  "용인시",
  "부천시",
  "화성시",
  "평택시",
  "고양시",
  "오산시",
  "안양시",
  "광명시",
  "군포시",
  "이천시",
  "시흥시",
  "양주시",
  "하남시",
  "포천시",
  "여주시",
  "안산시",
  "김포시",
  "의왕시",
  "구리시",
  "남양주시",
  "의정부시",
  "동두천시",
];

const Charts = () => {
  const [stateCount, setStateCount] = useState<number[]>([]); //상태별 동물 숫자 저장
  const [legionCount, setLegionCount] = useState<number[]>([]); //시군구별 동물 숫자 저장

  const { data } = useQuery({
    queryKey: ["allData"],
    queryFn: fetchAllData,
  });

  useEffect(() => {
    const stateCount = new Array(7).fill(0);
    const legionCount = new Array(24).fill(0);
    //상태별 숫자 계산
    data?.forEach((value) => {
      STATE.forEach((state, index) => {
        if (value.STATE_NM.includes(state)) {
          stateCount[index]++;
        }
      });
      //시군구별 숫자 계산
      LEGION.forEach((legion, index) => {
        if (value.SIGUN_NM.includes(legion)) {
          legionCount[index]++;
        }
      });
    });
    setStateCount(stateCount);
    setLegionCount(legionCount);
  }, [data]);

  const barData = {
    labels: STATE,
    datasets: [
      {
        label: "마리",
        data: stateCount,
        backgroundColor: CHART_COLOR.slice(0, 6),
      },
    ],
  };

  const donutData = {
    labels: LEGION,
    datasets: [
      {
        label: "시군구",
        data: legionCount,
        backgroundColor: CHART_COLOR,
      },
    ],
  };

  return (
    <Container>
      <H2>
        <span>경기도</span>
        <span>유기동물</span>
        <span>현황</span>
      </H2>
      <ChartsArea>
        <DonutChart data={donutData} />
        <BarChart data={barData} />
      </ChartsArea>
    </Container>
  );
};

export default Charts;
