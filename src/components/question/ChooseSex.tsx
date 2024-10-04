import styled from "styled-components";
import { g4, MAIN_COLOR } from "../../utils/color";
import { ReactComponent as MyGold } from "../../assets/icons/gold.svg";
import { ReactComponent as MyDiamond } from "../../assets/icons/diamond.svg";
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
    width: 110px;
    height: 110px;
    font-size: 1.1em;
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

const ChooseSex = ({ currentInfo, setCurrentInfo }: IProps) => {
  return (
    <Container>
      <H2>
        백만장자에게 금고를 선물 받았다. 금고 안에 어떤게 한가득 쌓여 있을까?
      </H2>
      <Boxs>
        <Box
          $selected={currentInfo === "남아"}
          onClick={() => setCurrentInfo("남아")}
        >
          <MyGold />
          <span>빛나는 황금</span>
        </Box>
        <Box
          $selected={currentInfo === "여아"}
          onClick={() => setCurrentInfo("여아")}
        >
          <MyDiamond />
          <span>화려한 보석</span>
        </Box>
      </Boxs>
    </Container>
  );
};

export default ChooseSex;
