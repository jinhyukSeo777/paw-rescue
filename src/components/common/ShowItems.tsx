import styled from "styled-components";
import { IData } from "../../pages/Home";
import Item from "./Item";

const Container = styled.section`
  margin: 6rem 0 3rem 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 2rem;
  position: relative;
  width: 100%;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 950px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 710px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 8rem auto 2rem auto;
    width: auto;
    gap: 2rem;
  }
  @media (max-width: 500px) {
    margin: 10rem auto 2rem auto;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
    width: auto;
    gap: 2rem;
  }
`;

const H2 = styled.h2`
  position: absolute;
  top: -5rem;
  left: 0;
  font-size: 2rem;
  @media (max-width: 710px) {
    top: -7rem;
  }
  @media (max-width: 500px) {
    top: -9rem;
  }
`;

interface IProps {
  data: IData[];
  totalCount: number;
}

const ShowItems = ({ data, totalCount }: IProps) => {
  return (
    <Container>
      <H2>{totalCount}마리의 친구들이 기다리고 있어요</H2>
      {data.map((value, index) => (
        <Item key={index} data={value} hoverEffect={true}></Item>
      ))}
    </Container>
  );
};

export default ShowItems;
