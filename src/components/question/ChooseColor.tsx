import styled from "styled-components";
import { g4, MAIN_COLOR } from "../../utils/color";
import { ReactComponent as White } from "../../assets/icons/color-white.svg";
import { ReactComponent as Black } from "../../assets/icons/color-black.svg";
import { ReactComponent as Gray } from "../../assets/icons/color-gray.svg";
import { ReactComponent as Brown } from "../../assets/icons/color-brown.svg";
import { ReactComponent as Gold } from "../../assets/icons/color-gold.svg";
import { ReactComponent as Three } from "../../assets/icons/color-three.svg";
import { ReactComponent as Fish } from "../../assets/icons/color-fish.svg";
import { ReactComponent as BlackWhite } from "../../assets/icons/color-black-white.svg";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
  @media (max-width: 570px) {
    margin-top: 3rem;
  }
`;

const H2 = styled.h2`
  font-size: 2rem;
  width: 50%;
  text-align: center;
  line-height: 3.5rem;
  @media (max-width: 570px) {
    font-size: 1.5rem;
    line-height: 2.5rem;
  }
`;

const Boxs = styled.div<{ $isCat: boolean }>`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  grid-template-columns: repeat(${(props) => (props.$isCat ? 4 : 3)}, 1fr);
  @media (max-width: 570px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Box = styled.div<{ $selected: boolean }>`
  width: 120px;
  height: 120px;
  border: 2px solid ${g4};
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  ${(props) =>
    props.$selected &&
    `
    background-color: ${MAIN_COLOR};
    color: white;
    border-color: ${MAIN_COLOR};
  `}
  @media (max-width: 570px) {
    width: 100px;
    height: 100px;
    font-size: 1.1rem;
    svg {
      width: 50px;
      height: 50px;
    }
  }
`;

interface IProps {
  isCat: boolean;
  currentInfo: string;
  setCurrentInfo: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseColor = ({ isCat, currentInfo, setCurrentInfo }: IProps) => {
  return (
    <Container>
      <H2>나를 위한 티셔츠를 고르고 있다. 어떤 색깔이 좋을까?</H2>
      <Boxs $isCat={isCat}>
        <Box
          $selected={currentInfo === "흰색"}
          onClick={() => setCurrentInfo("흰색")}
        >
          <White width={70} height={70} />
          <span>흰색</span>
        </Box>
        <Box
          $selected={currentInfo === "검은색"}
          onClick={() => setCurrentInfo("검은색")}
        >
          <Black width={70} height={70} />
          <span>검은색</span>
        </Box>
        <Box
          $selected={currentInfo === "회색"}
          onClick={() => setCurrentInfo("회색")}
        >
          <Gray width={70} height={70} />
          <span>회색</span>
        </Box>
        <Box
          $selected={currentInfo === "갈색"}
          onClick={() => setCurrentInfo("갈색")}
        >
          <Brown width={70} height={70} />
          <span>갈색</span>
        </Box>
        <Box
          $selected={currentInfo === "금색"}
          onClick={() => setCurrentInfo("금색")}
        >
          <Gold width={70} height={70} />
          <span>금색</span>
        </Box>
        {isCat && (
          <>
            <Box
              $selected={currentInfo === "삼색"}
              onClick={() => setCurrentInfo("삼색")}
            >
              <Three width={70} height={70} />
              <span>삼색</span>
            </Box>
            <Box
              $selected={currentInfo === "고등어색"}
              onClick={() => setCurrentInfo("고등어색")}
            >
              <Fish width={70} height={70} />
              <span>고등어색</span>
            </Box>
          </>
        )}
        <Box
          $selected={currentInfo === "흑백"}
          onClick={() => setCurrentInfo("흑백")}
        >
          <BlackWhite width={70} height={70} />
          <span>흑백</span>
        </Box>
      </Boxs>
    </Container>
  );
};

export default ChooseColor;
