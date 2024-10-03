import styled from "styled-components";
import { DESKTOP, PHONE, TABLET } from "../utils/size";
import { ReactComponent as MyIcon } from "../assets/icons/paw.svg";
import { ReactComponent as MyBg } from "../assets/images/bg.svg";
import { MAIN_COLOR } from "../utils/color";
import LastOneDay from "../components/home/LastOneDay";
import Charts from "../components/home/Charts";

const Container = styled.main`
  width: 90%;
  max-width: ${DESKTOP};
  margin: 0 auto;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: ${PHONE}) {
    align-items: center;
  }
`;

const Banner = styled.section`
  width: 100%;
  height: 50rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const BannerArea = styled.div`
  z-index: 9;
  div {
    width: 80%;
    span {
      font-size: 3rem;
      font-weight: bold;
      line-height: 4rem;
      &:nth-child(2) {
        color: ${MAIN_COLOR};
      }
    }
  }
  p {
    width: 80%;
    margin: 2rem 0;
    font-size: 1.3rem;
    line-height: 2rem;
  }
  button {
    background-color: ${MAIN_COLOR};
    border: none;
    color: white;
    padding: 0.8rem;
    border-radius: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  svg {
    fill: white;
    stroke: white;
    width: 30px;
    height: 30px;
  }
  @media (max-width: ${TABLET}) {
    div {
      width: 100%;
      span {
        font-size: 2.5rem;
        line-height: 3.7rem;
      }
    }
    p {
      margin: 2rem 0;
      font-size: 1.2rem;
      line-height: 2rem;
    }
  }
  @media (max-width: ${PHONE}) {
    div {
      width: 100%;
      span {
        font-size: 2rem;
        line-height: 3rem;
      }
    }
    p {
      margin: 2rem 0;
      font-size: 1rem;
      line-height: 1.6rem;
    }
  }
`;

const StyledBg = styled(MyBg)`
  height: 640px;
  @media (max-width: ${TABLET}) {
    position: absolute;
    width: 100%;
    height: auto;
    opacity: 0.4;
  }
`;

export interface IData {
  SPECIES_NM: string; //품종
  SEX_NM: "M" | "F"; //성별
  NEUT_YN: string; //중성화여부
  AGE_INFO: string; //나이
  BDWGH_INFO: string; //체중
  RECEPT_DE: string; //접수일시
  DISCVRY_PLC_INFO: string; //발견장소
  SFETR_INFO: string; //특징
  PBLANC_BEGIN_DE: string; //공고시작
  PBLANC_END_DE: string; //공고마감
  SHTER_NM: string; //보호센터
  REFINE_ROADNM_ADDR: string; //센터주소
  SHTER_TELNO: string; //연락처
  IMAGE_COURS: string; //이미지
  THUMB_IMAGE_COURS: string; //썸네일
  REFINE_WGS84_LAT: string; //위도
  REFINE_WGS84_LOGT: string; //경도
  SIGUN_NM: string; //시군명
  STATE_NM: string; //상태
  ABDM_IDNTFY_NO: string; //고유번호
  PBLANC_IDNTFY_NO: string; // 공고번호
  COLOR_NM: string; // 색상
}

const Home = () => {
  return (
    <Container>
      <Banner>
        <BannerArea>
          <div>
            <span>버려진 아이들과 당신의</span>
            <span>운명적 만남</span>
            <span>, 찾고 계신가요?</span>
          </div>
          <p>
            지금 당신의 따뜻한 마음을 기다리는 친구들이 있습니다. 유기동물
            입양으로 가족이 되어주세요.
          </p>
          <button>
            나의 반려동물 찾기
            <MyIcon style={{ marginLeft: "0.3rem" }} />
          </button>
        </BannerArea>
        <StyledBg />
      </Banner>
      <LastOneDay />
      <Charts />
    </Container>
  );
};

export default Home;
