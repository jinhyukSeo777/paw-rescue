import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  backdrop-filter: brightness(0.5);
  justify-content: center;
  align-items: center;
`;
interface IProps {
  children: React.ReactNode;
}

const Modal = ({ children }: IProps) => {
  return <Container>{children}</Container>;
};

export default Modal;
