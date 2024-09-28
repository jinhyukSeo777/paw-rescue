import styled from "styled-components";
import { g3, SECONDARY_COLOR } from "../../utils/color";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { IData } from "../../pages/Home";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Item from "../common/Item";
import { PHONE } from "../../utils/size";

const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5rem 0 3rem 0;
`;

const H2 = styled.h2`
  position: absolute;
  top: -6rem;
  left: 0;
  font-size: 2rem;
`;

const Wrap = styled.div`
  width: 100%;
  position: relative;
  @media (max-width: 1600px) {
    width: 1250px;
  }
  @media (max-width: 1440px) {
    width: 950px;
  }
  @media (max-width: 1100px) {
    width: 700px;
  }
  @media (max-width: 800px) {
    width: 450px;
  }
  @media (max-width: 600px) {
    width: 200px;
  }
  @media (max-width: ${PHONE}) {
    margin-top: 3rem;
  }
`;

const CustomNavButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${g3};
  cursor: pointer;
  z-index: 9;
  font-size: 2.5rem;
  &:hover {
    color: ${SECONDARY_COLOR};
  }
`;

const PrevButton = styled(CustomNavButton)`
  left: -3rem;
`;

const NextButton = styled(CustomNavButton)`
  right: -3rem;
`;

const LastOneDay = () => {
  const formatDateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    let day = date.getDate().toString().padStart(2, "0"); // 날짜도 2자리로 맞춤

    return `${year}${month}${day}`;
  };

  const getTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  };

  const fetchData = async (): Promise<IData[]> => {
    const KEY = process.env.REACT_APP_KEY;
    const tomorrow = getTomorrow();
    const formattedDate = formatDateToYYYYMMDD(tomorrow);

    const { data } = await axios.get(
      `https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=${KEY}&PBLANC_END_DE=${formattedDate}&Type=json&pSize=20`
    );
    return data.AbdmAnimalProtect[1].row;
  };

  const { data } = useQuery({
    queryKey: ["LastOneDay"],
    queryFn: fetchData,
  });

  return (
    <Container>
      <H2>공고기간이 하루 남은 친구들이에요!</H2>
      <Wrap>
        <PrevButton className="custom-prev">
          <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
        </PrevButton>
        <NextButton className="custom-next">
          <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
        </NextButton>
        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".custom-next", // 커스텀 네비게이션 버튼과 연결
            prevEl: ".custom-prev",
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
            800: {
              slidesPerView: 3,
            },
            1100: {
              slidesPerView: 4,
            },
            1440: {
              slidesPerView: 5,
            },
            1600: {
              slidesPerView: 6,
            },
          }}
        >
          {data?.map((value, index) => (
            <SwiperSlide key={index}>
              <Item data={value} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrap>
    </Container>
  );
};

export default LastOneDay;
