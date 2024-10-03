import styled from "styled-components";
import Modal from "./Modal";
import { g2, g4 } from "../../utils/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  background-color: ${g4};
  width: 28rem;
  opacity: 1;
  padding: 2rem;
  border-radius: 1rem;
  @media (max-width: 650px) {
    margin: 0 1rem;
  }
`;

const Close = styled.div`
  text-align: end;
  font-size: 1.2rem;
  color: ${g2};
  cursor: pointer;
`;

const Item = styled.div`
  background-color: white;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  span {
    font-weight: bold;
    font-size: 1.2rem;
  }
  p {
    margin-bottom: 0;
  }
  @media (max-width: 650px) {
    span {
      font-size: 1.1rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

interface IProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Answer = ({ setModalOpen }: IProps) => {
  return (
    <Modal>
      <Container>
        <Close onClick={() => setModalOpen(false)}>
          <FontAwesomeIcon icon={faX} />
        </Close>
        <Item>
          <span>첫 번째 문제는</span>
          <p>품종에 대한 문제입니다.</p>
        </Item>
        <Item>
          <span>두 번째 문제는</span>
          <p>성별에 대한 문제입니다.</p>
        </Item>
        <Item>
          <span>세 번째 문제는</span>
          <p>몸무게에 대한 문제입니다.</p>
        </Item>
        <Item>
          <span>네 번째 문제는</span>
          <p>색상에 대한 문제입니다.</p>
        </Item>
      </Container>
    </Modal>
  );
};

export default Answer;
