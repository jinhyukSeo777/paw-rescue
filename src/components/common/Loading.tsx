import styled, { keyframes } from "styled-components";
import { ReactComponent as MyDog } from "../../assets/icons/dog.svg";
import { ReactComponent as MyCat } from "../../assets/icons/cat.svg";
import { ReactComponent as MyRabbit } from "../../assets/icons/rabbit.svg";
import { PHONE } from "../../utils/size";

const bounce = keyframes`
     0%, 100% {
    transform: translateY(0);  
  }
  50% {
    transform: translateY(-1rem); 
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 5rem;
    height: 5rem;
    margin: 1rem;
    animation: ${bounce} 1.2s infinite ease-in-out both;
    &:nth-child(1) {
      animation-delay: -0.24s;
    }
    &:nth-child(2) {
      animation-delay: -0.12s;
    }
    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
  @media (max-width: ${PHONE}) {
    svg {
      width: 4rem;
      height: 4rem;
    }
  }
`;

const Loading = () => {
  return (
    <Container>
      <MyDog />
      <MyCat />
      <MyRabbit />
    </Container>
  );
};

export default Loading;
