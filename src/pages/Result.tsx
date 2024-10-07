import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IData } from "./Home";
import { DESKTOP } from "../utils/size";
import styled from "styled-components";
import { g1, g2, MAIN_COLOR } from "../utils/color";
import { ReactComponent as MyPaw } from "../assets/icons/paw.svg";
import { ReactComponent as MyBg } from "../assets/images/bg.svg";
import Solution from "../components/common/Solution";
import { fetchAllData } from "../utils/fetchData";

const Container = styled.main`
  width: 90%;
  max-width: ${DESKTOP};
  margin: 0 auto;
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const H2 = styled.h2`
  font-size: 2rem;
  text-align: center;
`;

const ItemArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-top: 9rem;
  @media (max-width: 850px) {
    gap: 3rem;
    margin-top: 6rem;
  }
  @media (max-width: 650px) {
    flex-direction: column;
    margin-top: 3rem;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  &:nth-child(2) {
    position: relative;
    top: -6rem;
  }
  @media (max-width: 850px) {
    &:nth-child(2) {
      top: -4rem;
    }
  }
  @media (max-width: 650px) {
    &:nth-child(2) {
      top: 0;
    }
  }
`;

const Photo = styled.div<{ $url: string }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 3px solid ${MAIN_COLOR};
  background: url(${(props) => props.$url}) no-repeat center;
  background-size: cover;
  @media (max-width: 850px) {
    width: 150px;
    height: 150px;
  }
`;

const GoDetail = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 2rem;
  border: 1px solid ${MAIN_COLOR};
  color: ${MAIN_COLOR};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: white;
  cursor: pointer;
  svg {
    margin-left: 3px;
    width: 35px;
    height: 35px;
    fill: ${MAIN_COLOR};
    stroke: ${MAIN_COLOR};
  }
  &:hover {
    background-color: ${MAIN_COLOR};
    color: white;
    svg {
      fill: white;
      stroke: white;
    }
  }
  @media (max-width: 850px) {
    width: 140px;
    height: 45px;
    font-size: 1.1rem;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const BtnArea = styled.div`
  gap: 3rem;
  display: flex;
  margin-top: 6rem;
  @media (max-width: 850px) {
    gap: 2rem;
  }
  @media (max-width: 650px) {
    gap: 1rem;
    flex-direction: column;
    width: 100%;
    margin-bottom: 3rem;
  }
`;

const Btn = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: transparent;
  border: 1px solid ${g2};
  color: ${g2};
  cursor: pointer;
  &:last-child {
    background-color: ${g1};
    border: 1px solid ${g1};
    color: white;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;

const NoResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  > svg {
    height: 500px;
  }
  span {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
  }
  p {
    width: 440px;
    font-size: 1.1rem;
    text-align: center;
    line-height: 1.9rem;
    margin: 1rem 0 3rem 0;
  }
  button {
    background-color: ${MAIN_COLOR};
    color: white;
    border: none;
    font-size: 1.3rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 440px;
    height: 50px;
    border-radius: 2rem;
    cursor: pointer;
    svg {
      width: 35px;
      height: 35px;
      fill: white;
      stroke: white;
      margin-left: 0.5rem;
    }
  }
  @media (max-width: 650px) {
    width: 100%;
    > svg {
      height: 350px;
    }
    span {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
      width: 100%;
      margin: 1rem 0 2rem 0;
    }
    button {
      width: 100%;
      max-width: 400px;
    }
  }
`;

interface IInfo {
  allInfo: string[];
}

const Result = () => {
  const [result, setResult] = useState<IData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const { allInfo } = (location.state as IInfo) || [];
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["allData"],
    queryFn: fetchAllData,
  });

  const filterSpecies = useCallback(
    (value: string) => {
      if (allInfo[0] === "강아지" && value.includes("개")) return true;
      if (allInfo[0] === "고양이" && value.includes("고양이")) return true;
      if (
        allInfo[0] === "그외" &&
        !value.includes("개") &&
        !value.includes("고양이")
      )
        return true;
      return false;
    },
    [allInfo]
  );
  const filterSex = useCallback(
    (value: string) => {
      if (allInfo[1] === "남아" && value === "M") return true;
      if (allInfo[1] === "여아" && value === "F") return true;
      return false;
    },
    [allInfo]
  );
  const filterSize = useCallback(
    (value: string) => {
      const weight = +value.replace("(Kg)", "");
      if (allInfo[2] === "3" && weight <= 3) return true;
      if (allInfo[2] === "5" && 3 < weight && weight <= 5) return true;
      if (allInfo[2] === "10" && 5 < weight && weight <= 10) return true;
      if (allInfo[2] === "그외" && 10 < weight) return true;
      return false;
    },
    [allInfo]
  );
  const filterColor = useCallback(
    (value: string) => {
      const whiteKeyword = ["아이보리", "크림", "백", "흰"];
      const blackKeyword = ["검", "흑"];
      const grayKeyword = ["회백", "쥐", "검", "흰", "흑", "백"];
      const brownKeyword = ["갈", "베이지", "초코"];
      const goldKeyword = ["노", "황", "크림", "치즈"];
      const threeKeyword = ["삼", "줄", "흰", "검", "갈"];
      const fishKeyword = ["고등어", "반점"];
      const blackWhiteKeyword = ["얼룩", "검", "흑", "백", "흰"];
      if (
        allInfo[3] === "흰색" &&
        whiteKeyword.some((keyword) => value.includes(keyword))
      )
        return true;
      if (
        allInfo[3] === "검은색" &&
        blackKeyword.some((keyword) => value.includes(keyword))
      )
        return true;
      if (
        allInfo[3] === "회색" &&
        grayKeyword.some((keyword) => value.includes(keyword))
      )
        return true;
      if (
        allInfo[3] === "갈색" &&
        brownKeyword.some((keyword) => value.includes(keyword))
      )
        return true;
      if (
        allInfo[3] === "금색" &&
        goldKeyword.some((keyword) => value.includes(keyword))
      )
        return true;
      if (
        allInfo[3] === "삼색" &&
        threeKeyword.some((keyword) => value.includes(keyword))
      )
        return true;
      if (
        allInfo[3] === "고등어색" &&
        fishKeyword.some((keyword) => value.includes(keyword))
      )
        return true;
      if (
        allInfo[3] === "흑백" &&
        blackWhiteKeyword.some((keyword) => value.includes(keyword))
      )
        return true;
      return false;
    },
    [allInfo]
  );

  //조건에 맞는 동물 찾기
  useEffect(() => {
    const storedItems = localStorage.getItem("filterdData");
    //페이지를 재방문할 경우 ex)새로고침, 뒤로가기 버튼
    if (storedItems) {
      setResult(JSON.parse(storedItems));
      return;
    }
    //페이지를 처음 방문할 경우
    const filterdData = data?.filter((value) => {
      if (!filterSpecies(value.SPECIES_NM)) return false;
      if (!filterSex(value.SEX_NM)) return false;
      if (!filterSize(value.BDWGH_INFO)) return false;
      if (!filterColor(value.COLOR_NM)) return false;
      return true;
    });
    if (!filterdData) return;
    const result = getRandomElements(filterdData, 3);
    setResult(result);
    localStorage.setItem("filterdData", JSON.stringify(result));
  }, [data, filterColor, filterSex, filterSize, filterSpecies]);

  // 설문조사를 건너띄고 온 유저 404로 보내기
  useEffect(() => {
    if (!allInfo) {
      navigate("/404");
    }
  }, [allInfo, navigate]);

  const deleteTag = (value: string) => {
    return value.replace(/\[.*?\]/, "").trim();
  };

  const getAge = (value: string) => {
    const today = new Date();
    const year = today.getFullYear();
    const birthYear = +value.slice(0, 4);
    const diff = year - birthYear;
    return diff + 1;
  };

  const goDetailPage = (data: IData) => {
    navigate("/detail", { state: { data } });
  };

  const getRandomElements = (arr: IData[], count: number) => {
    const result = [];
    const usedIndices = new Set(); //중복 제거 위해 뽑힌 번호 저장

    while (result.length < count) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      //중복 방지
      if (!usedIndices.has(randomIndex)) {
        result.push(arr[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }
    return result;
  };

  return (
    <Container>
      {result.length !== 0 ? (
        <>
          <H2>당신의 운명의 반려동물을 찾았어요!</H2>
          <ItemArea>
            {result.map((value, index) => (
              <Item key={index}>
                <Photo $url={value.IMAGE_COURS}></Photo>
                <div>
                  <span>{deleteTag(value.SPECIES_NM)}</span>
                  <span>{getAge(value.AGE_INFO)}살</span>
                </div>
                <GoDetail onClick={() => goDetailPage(value)}>
                  보러가기 <MyPaw />
                </GoDetail>
              </Item>
            ))}
          </ItemArea>
          <BtnArea>
            <Btn onClick={() => setModalOpen(true)}>결과 설명듣기</Btn>
            <Btn onClick={() => navigate("/recommend")}>테스트 다시하기</Btn>
          </BtnArea>
          {modalOpen && <Solution setModalOpen={setModalOpen} />}
        </>
      ) : (
        <NoResultBox>
          <MyBg />
          <span>운명의 반려동물을 찾지 못 했어요</span>
          <p>
            하지만 지금 당신의 따뜻한 마음을 기다리는 친구들이 있습니다.
            유기동물 입양으로 가족이 되어주세요.
          </p>
          <button onClick={() => navigate("/list")}>
            유기동물 보기 <MyPaw />
          </button>
        </NoResultBox>
      )}
    </Container>
  );
};

export default Result;
