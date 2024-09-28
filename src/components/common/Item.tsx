import styled from "styled-components";
import { IData } from "../../pages/Home";
import { SECONDARY_COLOR } from "../../utils/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as FullBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as ImptyBookmark } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateMyPet } from "../../contexts/counterSlice";

const Container = styled.div<{ $hoverEffect: boolean | undefined }>`
  position: relative;
  width: 200px;
  cursor: pointer;
  position: relative;
  top: 0;
  &:hover {
    top: ${(props) => (props.$hoverEffect ? "-1.5rem" : null)};
    transition: ${(props) => (props.$hoverEffect ? "0.3s" : null)};
  }
`;

const Photo = styled.div<{ $url: string }>`
  width: 200px;
  height: 200px;
  border-radius: 0.5rem;
  background: url(${(props) => props.$url}) no-repeat center;
  background-size: cover;
`;

const Info = styled.div`
  margin-top: 1rem;
  div {
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;
    &:first-child {
      span {
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
    }
    &:not(:first-child) {
      span {
        &:first-child {
          opacity: 0.6;
        }
      }
    }
  }
`;

const State = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.5rem;
  background-color: ${SECONDARY_COLOR};
  color: white;
  border-radius: 1rem;
  font-size: 0.8rem;
`;

interface IProps {
  data: IData;
  hoverEffect?: true | undefined;
}

const Item = ({ data, hoverEffect }: IProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

  const getLikeList = () => {
    const obj = localStorage.getItem("like");
    const likeList: IData[] = obj ? JSON.parse(obj) : null;
    return likeList || [];
  };

  useEffect(() => {
    const likeList = getLikeList();
    const isIn = likeList.some(
      (value) => value.ABDM_IDNTFY_NO === data.ABDM_IDNTFY_NO
    );
    setIsLiked(isIn);
  }, [data.ABDM_IDNTFY_NO]);

  const handleLike = () => {
    const likeList = getLikeList();
    if (isLiked) {
      const newList = likeList.filter(
        (value) => value.ABDM_IDNTFY_NO !== data.ABDM_IDNTFY_NO
      );
      localStorage.setItem("like", JSON.stringify(newList));
      dispatch(updateMyPet(newList));
      setIsLiked(false);
    } else {
      likeList.push(data);
      localStorage.setItem("like", JSON.stringify(likeList));
      dispatch(updateMyPet(likeList));
      setIsLiked(true);
    }
  };

  return (
    <Container $hoverEffect={hoverEffect}>
      <Photo $url={data.IMAGE_COURS}></Photo>
      <Info>
        <div>
          <span>{data.SPECIES_NM}</span>
          <span onClick={handleLike}>
            {isLiked ? (
              <FontAwesomeIcon
                style={{ color: SECONDARY_COLOR }}
                icon={FullBookmark}
              />
            ) : (
              <FontAwesomeIcon
                style={{ color: SECONDARY_COLOR }}
                icon={ImptyBookmark}
              />
            )}
          </span>
        </div>
        <div>
          <span>나이</span>
          <span>{data.AGE_INFO}</span>
        </div>
        <div>
          <span>시도군</span>
          <span>{data.SIGUN_NM}</span>
        </div>
        <div>
          <span>성별</span>
          <span>{data.SEX_NM === "M" ? "남아" : "여아"}</span>
        </div>
        <div>
          <span>중성화</span>
          <span>{data.NEUT_YN === "Y" ? "중성화 완료" : "중성화 미완료"}</span>
        </div>
      </Info>
      <State>{data.STATE_NM}</State>
    </Container>
  );
};

export default Item;
