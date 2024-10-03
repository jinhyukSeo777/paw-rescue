import styled from "styled-components";
import { g4, SECONDARY_COLOR } from "../../utils/color";

const ContainerStyle = styled.div`
  width: 100%;
  height: 1.2rem;
  border-radius: 2rem;
  background-color: ${g4};
  overflow: hidden;
`;

const FillerStyle = styled.div<{ $index: number }>`
  width: calc(100% / 4 * ${(props) => props.$index + 1});
  height: 1.2rem;
  background-color: ${SECONDARY_COLOR};
`;

interface IProps {
  index: number;
}

const ProgressBar = ({ index }: IProps) => {
  return (
    <ContainerStyle>
      <FillerStyle $index={index} />
    </ContainerStyle>
  );
};

export default ProgressBar;
