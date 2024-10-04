import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  height: 100vh;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  font-size: 3rem;
`;

const Error = () => {
  return <Container>404</Container>;
};

export default Error;
