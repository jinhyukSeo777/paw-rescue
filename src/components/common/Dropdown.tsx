import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PHONE } from "./../../utils/size";

const Container = styled.div`
  position: relative;
  width: 150px;
  cursor: pointer;
  @media (max-width: ${PHONE}) {
    width: 100px;
  }
`;

const DropdownToggle = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
  text-align: center;
  border-radius: 1rem;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 3rem;
  width: 100%;
  border-radius: 1rem;
  right: 0;
  border: 1px solid #ccc;
  background-color: white;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: auto;
  max-height: 15rem;
  &::-webkit-scrollbar {
    width: 0px;
  }
  li {
    padding: 10px;
    border-bottom: 1px solid #eee;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #f0f0f0;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

interface IProps {
  category: string;
  data: string[];
  setState: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setSelectedDropDown: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({
  category,
  data,
  setState,
  isOpen,
  setSelectedDropDown,
}: IProps) => {
  const [value, setValue] = useState(category); // 드롭다운의 현재 value 값
  const ref = useRef<HTMLUListElement | null>(null); // 드롭다운을 가리키는 ref 객체

  // 외부 클릭시 드롭다운 닫는 함수
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        setSelectedDropDown(""); // 드롭다운 닫는 역할
      }
    };
    // 마운트될 때 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    // 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSelectedDropDown]);

  const toggleDropdown = () => {
    if (isOpen) setSelectedDropDown("");
    else setSelectedDropDown(category);
  };

  const handleOptionClick = (value: string) => {
    setValue(value);
    setSelectedDropDown(""); // 드롭다운 닫는 역할
    setState(value);
  };

  return (
    <Container>
      <DropdownToggle onClick={toggleDropdown}>{value}</DropdownToggle>
      {isOpen && (
        <DropdownMenu ref={ref}>
          {data.map((value, index) => (
            <li key={index} onClick={() => handleOptionClick(value)}>
              {value}
            </li>
          ))}
        </DropdownMenu>
      )}
    </Container>
  );
};

export default Dropdown;
