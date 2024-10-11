import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  height: 100vh;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  font-size: 2rem;
  text-align: center;
  h1 {
    margin-bottom: 1rem;
  }
`;

const Error = () => {
  const navigate = useNavigate();

  // 1.5초후 홈으로 페이지 전환하는 함수
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  });

  return (
    <Container>
      <h1>404</h1>
      <p>곧 메인페이지로 이동합니다.</p>
    </Container>
  );
};

export default Error;
