import styled from "styled-components";
import { DESKTOP, PHONE, TABLET } from "../utils/size";
import { useEffect, useState } from "react";
import { IData } from "./Home";
import ShowItems from "../components/common/ShowItems";
import Pagenation from "../components/common/Pagenation";
import { RootState } from "../contexts/store";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as MyBg } from "../assets/images/bg.svg";
import { updateMyPet } from "../contexts/counterSlice";

const Container = styled.main`
  width: 90%;
  max-width: ${DESKTOP};
  margin: 0 auto;
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
`;

const H2 = styled.h2`
  font-size: 2rem;
`;

const Div = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

const StyledBg = styled(MyBg)`
  height: 600px;
  @media (max-width: ${TABLET}) {
    height: 450px;
  }
  @media (max-width: ${PHONE}) {
    height: 340px;
  }
`;

const MyPet = () => {
  const [page, setPage] = useState(1);
  const data = useSelector((state: RootState) => state.counter.myPet);
  const dispatch = useDispatch();

  useEffect(() => {
    const jsonString = localStorage.getItem("like");
    if (!jsonString) return;
    const jsonObject: IData[] = JSON.parse(jsonString) || [];
    dispatch(updateMyPet(jsonObject));
  }, [dispatch]);

  return (
    <Container>
      {data.length !== 0 ? (
        <>
          <H2>친구들에게 관심을 가져주셔서 감사해요!</H2>
          <ShowItems data={data.slice((page - 1) * 20, page * 20)} />
          <Pagenation page={page} setPage={setPage} totalCount={data.length} />
        </>
      ) : (
        <Div>
          <StyledBg></StyledBg>
          <H2>다시 보고 싶은 친구들을 추가해주세요!</H2>
        </Div>
      )}
    </Container>
  );
};

export default MyPet;
