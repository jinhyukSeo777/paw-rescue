import styled from "styled-components";
import { g4, MAIN_COLOR } from "../../utils/color";
import { ReactComponent as MyDog } from "../../assets/icons/dog.svg";
import { ReactComponent as MyCat } from "../../assets/icons/cat.svg";
import { ReactComponent as MyRabbit } from "../../assets/icons/rabbit.svg";
import { PHONE } from "../../utils/size";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
  width: 100%;
  @media (max-width: ${PHONE}) {
    margin-top: 3rem;
  }
`;

const H2 = styled.h2`
  font-size: 2rem;
  width: 50%;
  text-align: center;
  line-height: 3.5rem;
  @media (max-width: ${PHONE}) {
    font-size: 1.5rem;
    line-height: 2.5rem;
  }
`;

const Boxs = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  @media (max-width: ${PHONE}) {
    gap: 1rem;
  }
`;

const Box = styled.div<{ $selected: boolean }>`
  width: 150px;
  height: 150px;
  border: 2px solid ${g4};
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  ${(props) =>
    props.$selected &&
    `
    background-color: ${MAIN_COLOR};
    color: white;
    border-color: ${MAIN_COLOR};
  `}
  svg {
    width: 90px;
    height: 90px;
  }
  @media (max-width: ${PHONE}) {
    width: 100px;
    height: 100px;
    font-size: 1.2rem;
    svg {
      width: 60px;
      height: 60px;
    }
  }
`;

interface IProps {
  currentInfo: string;
  setCurrentInfo: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseSpecies = ({ currentInfo, setCurrentInfo }: IProps) => {
  return (
    <Container>
      <H2>어느 날 눈앞에 동물이 나에게 달려온다! 이 동물은 무엇일까?</H2>
      <Boxs>
        <Box
          $selected={currentInfo === "강아지"}
          onClick={() => setCurrentInfo("강아지")}
        >
          <MyDog />
          <span>강아지</span>
        </Box>
        <Box
          $selected={currentInfo === "고양이"}
          onClick={() => setCurrentInfo("고양이")}
        >
          <MyCat />
          <span>고양이</span>
        </Box>
        <Box
          $selected={currentInfo === "그외"}
          onClick={() => setCurrentInfo("그외")}
        >
          <MyRabbit />
          <span>그외</span>
        </Box>
      </Boxs>
    </Container>
  );
};

export default ChooseSpecies;
