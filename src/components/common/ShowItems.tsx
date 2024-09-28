import styled from "styled-components";
import { IData } from "../../pages/Home";
import Item from "./Item";

const Container = styled.section`
  margin: 0rem 0 3rem 0;
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
    margin: 0rem auto 2rem auto;
    width: auto;
    gap: 2rem;
  }
  @media (max-width: 500px) {
    margin: 0rem auto 2rem auto;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
    width: auto;
    gap: 2rem;
  }
`;

interface IProps {
  data: IData[];
}

const ShowItems = ({ data }: IProps) => {
  return (
    <Container>
      {data.map((value, index) => (
        <Item key={index} data={value} hoverEffect={true}></Item>
      ))}
    </Container>
  );
};

export default ShowItems;
