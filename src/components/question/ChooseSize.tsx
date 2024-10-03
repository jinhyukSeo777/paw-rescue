import styled from "styled-components";
import { g4, SECONDARY_COLOR } from "../../utils/color";
import { ReactComponent as MyKey } from "../../assets/icons/key.svg";
import { ReactComponent as MyCarrier } from "../../assets/icons/carrier.svg";
import { ReactComponent as MyCar } from "../../assets/icons/car.svg";
import { ReactComponent as MyHouse } from "../../assets/icons/house.svg";
import { PHONE } from "../../utils/size";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
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
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  grid-template-columns: repeat(2, 1fr);
`;

const Box = styled.div<{ $selected: boolean }>`
  width: 220px;
  height: 130px;
  border: 2px solid ${g4};
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  ${(props) =>
    props.$selected &&
    `
    background-color: ${SECONDARY_COLOR};
    color: white;
    border-color: ${SECONDARY_COLOR};
  `}
  @media (max-width: ${PHONE}) {
    width: 150px;
    height: 100px;
    font-size: 1.1rem;
    svg {
      width: 50px;
      height: 50px;
    }
  }
`;

interface IProps {
  currentInfo: string;
  setCurrentInfo: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseSize = ({ currentInfo, setCurrentInfo }: IProps) => {
  return (
    <Container>
      <H2>
        꿈 속에서 이상한 나라로 가는 문이 눈 앞에 있다. 이 문의 크기는 얼마날까?
      </H2>
      <Boxs>
        <Box
          $selected={currentInfo === "3"}
          onClick={() => setCurrentInfo("3")}
        >
          <span>열쇠 크기</span>
          <MyKey width={90} height={90} />
        </Box>
        <Box
          $selected={currentInfo === "5"}
          onClick={() => setCurrentInfo("5")}
        >
          <span>캐리어 크기</span>
          <MyCarrier width={90} height={90} />
        </Box>
        <Box
          $selected={currentInfo === "10"}
          onClick={() => setCurrentInfo("10")}
        >
          <span>자동차 크기</span>
          <MyCar width={90} height={90} />
        </Box>
        <Box
          $selected={currentInfo === "그외"}
          onClick={() => setCurrentInfo("그외")}
        >
          <span>집채 크기</span>
          <MyHouse width={90} height={90} />
        </Box>
      </Boxs>
    </Container>
  );
};

export default ChooseSize;
