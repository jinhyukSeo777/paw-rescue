import styled from "styled-components";
import { DESKTOP, PHONE, TABLET } from "../../utils/size";
import { ReactComponent as MyLogo } from "../../assets/icons/logo.svg";
import { g1, MAIN_COLOR } from "../../utils/color";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.header`
  width: 100%;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 1px 15px 2px rgba(0, 0, 0, 0.05);
  z-index: 999;
`;

const Nav = styled.nav`
  width: 90%;
  max-width: ${DESKTOP};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "yg-jalnan", sans-serif;
  cursor: pointer;
  span {
    margin: 0 0.1rem;
    font-size: 1.3rem;
  }
`;

const Gnb = styled.ul<{ $active: boolean }>`
  display: flex;
  list-style: none;
  @media (max-width: ${TABLET}) {
    display: block;
    position: fixed;
    width: 15rem;
    height: 100%;
    background-color: white;
    transition: 0.3s;
    top: -1rem;
    right: ${(props) => (props.$active ? "0" : "-15rem")};
    z-index: 9;
    box-shadow: 0px 1px 15px 2px rgba(0, 0, 0, 0.05);
    padding: 6rem 0;
    li {
      margin: 0 1rem;
    }
  }
  @media (max-width: ${PHONE}) {
    width: 100%;
    display: ${(props) => (props.$active ? "flex" : "none")};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    li {
      margin-top: 1rem;
      width: 7rem;
      text-align: center;
      color: ${MAIN_COLOR};
      border: 1px solid ${MAIN_COLOR};
    }
  }
`;

const Li = styled.li<{ $isCurrentUrl: boolean }>`
  padding: 1rem;
  border-radius: 2rem;
  cursor: pointer;
  color: ${(props) => (props.$isCurrentUrl ? `${MAIN_COLOR}` : null)};
  &:hover {
    background-color: ${MAIN_COLOR};
    color: white;
  }
`;

const HamBtn = styled.button<{ $active: boolean }>`
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  position: relative;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: none;
  z-index: 99;
  span {
    width: 100%;
    height: ${(props) => (props.$active ? "0px" : "4px")};
    display: block;
    border-radius: 3px;
    background-color: ${g1};
    position: relative;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      display: block;
      border-radius: 3px;
      background-color: ${g1};
      top: ${(props) => (props.$active ? "50%" : "-10px")};
      left: ${(props) => (props.$active ? "50%" : "0")};
      transform: ${(props) =>
        props.$active ? "translate(-50%, -50%) rotate(45deg)" : null};
      transition: 0.3s;
    }
    &::after {
      top: ${(props) => (props.$active ? "50%" : "10px")};
      transform: ${(props) =>
        props.$active ? "translate(-50%, -50%) rotate(-45deg)" : null};
    }
  }
  @media (max-width: ${TABLET}) {
    display: block;
  }
  @media (max-width: ${PHONE}) {
    span,
    span::before,
    span::after {
      background-color: ${(props) =>
        props.$active ? `${MAIN_COLOR}` : `${g1}`};
    }
  }
`;

const Header = () => {
  const [isHamActive, setIsHamActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;

  const changeUrl = (path: string) => {
    navigate(path);
    setIsHamActive(false);
  };

  return (
    <Container>
      <Nav>
        <Logo onClick={() => changeUrl("/")}>
          <span>발바닥</span>
          <MyLogo width={30} height={30} />
          <span>구조대</span>
        </Logo>
        <Gnb $active={isHamActive}>
          <Li
            onClick={() => changeUrl("/list")}
            $isCurrentUrl={currentUrl === "/list"}
          >
            유기동물 보기
          </Li>
          <Li
            onClick={() => changeUrl("/match")}
            $isCurrentUrl={currentUrl === "/match"}
          >
            털친소
          </Li>
          <Li
            onClick={() => changeUrl("/shelter")}
            $isCurrentUrl={currentUrl === "/shelter"}
          >
            주변보호소 찾기
          </Li>
          <Li
            onClick={() => changeUrl("/mypet")}
            $isCurrentUrl={currentUrl === "/bb"}
          >
            나의 관심동물
          </Li>
        </Gnb>
        <HamBtn
          onClick={() => setIsHamActive((prev) => !prev)}
          $active={isHamActive}
        >
          <span></span>
        </HamBtn>
      </Nav>
    </Container>
  );
};

export default Header;
