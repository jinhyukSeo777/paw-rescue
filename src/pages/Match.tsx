import styled from "styled-components";
import { DESKTOP, PHONE } from "../utils/size";
import { MAIN_COLOR } from "../utils/color";
import { useEffect, useState } from "react";
import ChooseSpecies from "../components/question/ChooseSpecies";
import ChooseSex from "../components/question/ChooseSex";
import ChooseSize from "../components/question/ChooseSize";
import ChooseColor from "../components/question/ChooseColor";
import { ReactComponent as MyIcon } from "../assets/icons/paw.svg";
import ProgressBar from "../components/common/ProgressBar";
import { useNavigate } from "react-router-dom";
import { updateMatchResult } from "../contexts/counterSlice";
import { useDispatch } from "react-redux";

const Container = styled.main`
  width: 90%;
  max-width: ${DESKTOP};
  margin: 0 auto;
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnArea = styled.div`
  display: flex;
  gap: 2rem;
  margin: 4rem 0;
`;

const Btn = styled.button<{ $disable?: boolean }>`
  width: 11rem;
  height: 3rem;
  background-color: ${MAIN_COLOR};
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: ${(props) => (props.$disable ? 0.5 : 1)};
  svg {
    width: 30px;
    height: 30px;
    fill: white;
    stroke: white;
  }
  @media (max-width: ${PHONE}) {
    width: 9rem;
    height: 2.5rem;
    font-size: 1.3rem;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const Match = () => {
  const [index, setIndex] = useState(0);
  const [allInfo, setAllInfo] = useState<string[]>([]); //품종, 성별, 몸무게, 색상 순으로 저장
  const [currentInfo, setCurrentInfo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePrev = () => {
    setCurrentInfo("");
    setIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!currentInfo) return;
    const temp = allInfo;
    temp[index] = currentInfo;
    setAllInfo(temp);
    setCurrentInfo("");
    setIndex((prev) => prev + 1);
  };

  //재설문시 기존의 설문결과 제거
  useEffect(() => {
    dispatch(updateMatchResult([]));
  });

  useEffect(() => {
    if (index === 4) {
      //설문 완료
      navigate("/result", { state: { allInfo } });
    }
  }, [allInfo, index, navigate]);

  return (
    <Container>
      <ProgressBar index={index} />
      {index === 0 && (
        <ChooseSpecies
          currentInfo={currentInfo}
          setCurrentInfo={setCurrentInfo}
        />
      )}
      {index === 1 && (
        <ChooseSex currentInfo={currentInfo} setCurrentInfo={setCurrentInfo} />
      )}
      {index === 2 && (
        <ChooseSize currentInfo={currentInfo} setCurrentInfo={setCurrentInfo} />
      )}
      {index === 3 && (
        <ChooseColor
          isCat={allInfo[0] === "고양이"}
          currentInfo={currentInfo}
          setCurrentInfo={setCurrentInfo}
        />
      )}
      <BtnArea>
        {index !== 0 && (
          <Btn onClick={handlePrev}>
            이전
            <MyIcon style={{ marginLeft: "0.5rem" }} />
          </Btn>
        )}
        <Btn
          $disable={!currentInfo}
          disabled={!currentInfo}
          onClick={handleNext}
        >
          다음
          <MyIcon style={{ marginLeft: "0.5rem" }} />
        </Btn>
      </BtnArea>
    </Container>
  );
};

export default Match;
