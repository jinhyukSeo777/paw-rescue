import { useLocation } from "react-router-dom";
import { IData } from "./Home";
import styled from "styled-components";
import { DESKTOP } from "../utils/size";
import { MAIN_COLOR } from "../utils/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faBookmark as FullBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as ImptyBookmark } from "@fortawesome/free-regular-svg-icons";
import { updateMyPet } from "../contexts/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import SheltersMap from "../components/common/SheltersMap";
import { RootState } from "../contexts/store";

const Container = styled.main`
  width: 90%;
  max-width: ${DESKTOP};
  margin: 0 auto;
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 890px) {
    align-items: center;
  }
`;

const H2 = styled.h2`
  font-size: 2rem;
  span {
    margin-right: 0.6rem;
    color: ${MAIN_COLOR};
    &:first-child {
      cursor: pointer;
      position: relative;
      top: 3px;
    }
  }
`;

const InfoArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  @media (max-width: 890px) {
    flex-direction: column;
  }
`;

const Photo = styled.div<{ $url: string }>`
  width: 31rem;
  height: 36rem;
  margin-right: 5rem;
  background: url(${(props) => props.$url}) no-repeat center;
  background-size: cover;
  border-radius: 0.5rem;
  @media (max-width: 1140px) {
    width: 24rem;
    height: 31rem;
    margin-right: 4rem;
  }
  @media (max-width: 890px) {
    margin-right: 0;
    margin-bottom: 2rem;
  }
  @media (max-width: 588px) {
    width: 100%;
  }
`;

const InfoBox = styled.div`
  @media (max-width: 890px) {
    display: flex;
    flex-wrap: wrap;
    max-width: 500px;
  }
  @media (max-width: 588px) {
    max-width: 250px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 3px;
  span {
    font-size: 1rem;
    min-width: 6.5rem;
    height: 2.5rem;
    margin-right: 1.5rem;
    text-align: center;
    align-content: center;
    background-color: ${MAIN_COLOR};
    border-radius: 2rem;
    color: white;
  }
  @media (max-width: 1140px) {
    margin-bottom: 2px;
    font-size: 0.8rem;
    span {
      font-size: 0.9rem;
      min-width: 100px;
      height: 2.2rem;
      margin-right: 1.2rem;
    }
  }
  @media (max-width: 890px) {
    width: 250px;
    &:nth-child(7),
    &:nth-child(8),
    &:nth-child(9),
    &:nth-child(10),
    &:nth-child(11),
    &:nth-child(12) {
      width: 100%;
    }
  }
`;

interface ILocation {
  data: IData;
}

const Detail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = (location.state as ILocation) || {};
  const shelters = [
    {
      SHTER_NM: data.SHTER_NM,
      REFINE_WGS84_LAT: data.REFINE_WGS84_LAT,
      REFINE_WGS84_LOGT: data.REFINE_WGS84_LOGT,
    },
  ];
  const likeList = useSelector((state: RootState) => state.counter.myPet);

  const handleLike = () => {
    if (isLiked) {
      //좋아요 목록에서 제거
      const newList = likeList.filter(
        (value) => value.ABDM_IDNTFY_NO !== data.ABDM_IDNTFY_NO
      );
      dispatch(updateMyPet(newList));
      setIsLiked(false);
    } else {
      //좋아요 목록에 추가
      const newList = [...likeList, data];
      dispatch(updateMyPet(newList));
      setIsLiked(true);
    }
  };

  const formatDate = (dateString: string) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  };

  useEffect(() => {
    const isIn = likeList.some(
      (value) => value.ABDM_IDNTFY_NO === data.ABDM_IDNTFY_NO
    );
    setIsLiked(isIn);
  }, [data.ABDM_IDNTFY_NO, likeList]);

  return (
    <Container>
      <H2>
        <span onClick={handleLike}>
          {isLiked ? (
            <FontAwesomeIcon
              style={{ color: MAIN_COLOR }}
              icon={FullBookmark}
            />
          ) : (
            <FontAwesomeIcon
              style={{ color: MAIN_COLOR }}
              icon={ImptyBookmark}
            />
          )}
        </span>
        <span>공고번호</span>
        {data.PBLANC_IDNTFY_NO}
      </H2>
      <InfoArea>
        <Photo $url={data.IMAGE_COURS} />
        <InfoBox>
          <Info>
            <span>품종</span>
            <p>{data.SPECIES_NM}</p>
          </Info>
          <Info>
            <span>성별</span>
            <p>{data.SEX_NM}</p>
          </Info>
          <Info>
            <span>중성화여부</span>
            <p>{data.NEUT_YN}</p>
          </Info>
          <Info>
            <span>나이</span>
            <p>{data.AGE_INFO}</p>
          </Info>
          <Info>
            <span>체중</span>
            <p>{data.BDWGH_INFO}</p>
          </Info>
          <Info>
            <span>접수일시</span>
            <p>{formatDate(data.RECEPT_DE)}</p>
          </Info>
          <Info>
            <span>발견장소</span>
            <p>{data.DISCVRY_PLC_INFO}</p>
          </Info>
          <Info>
            <span>특징</span>
            <p>{data.SFETR_INFO}</p>
          </Info>
          <Info>
            <span>공고기한</span>
            <p>
              {formatDate(data.PBLANC_BEGIN_DE)} ~{" "}
              {formatDate(data.PBLANC_END_DE)}
            </p>
          </Info>
          <Info>
            <span>보호센터</span>
            <p>{data.SHTER_NM}</p>
          </Info>
          <Info>
            <span>센터주소</span>
            <p>{data.REFINE_ROADNM_ADDR}</p>
          </Info>
          <Info>
            <span>연락처</span>
            <p>{data.SHTER_TELNO}</p>
          </Info>
        </InfoBox>
      </InfoArea>
      <H2>{data.SHTER_NM}에서 기다리고 있어요</H2>
      <SheltersMap shelters={shelters} />
    </Container>
  );
};

export default Detail;
