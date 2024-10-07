import { useEffect, useState } from "react";
import styled from "styled-components";
import { g2, MAIN_COLOR } from "../../utils/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  min-height: 20rem;
  margin-bottom: 5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Arrow = styled.div`
  font-size: 1.7rem;
  margin: 0 1rem;
  cursor: pointer;
  color: ${g2};
  position: absolute;
  top: 50%;
  left: 50%;
  &:first-child {
    transform: translate(calc(-50% - 160px), -50%);
  }
  &:last-child {
    transform: translate(calc(-50% + 160px), -50%);
  }
  &:hover {
    color: ${MAIN_COLOR};
  }
`;

const BtnArea = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const Btn = styled.li<{ $isMatch: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  align-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 0.3rem;
  background-color: ${(props) => (props.$isMatch ? `${MAIN_COLOR}` : null)};
  border: 1px solid ${(props) => (props.$isMatch ? `${MAIN_COLOR}` : `${g2}`)};
  color: ${(props) => (props.$isMatch ? "white" : null)};
`;

interface IProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
}

const Pagenation = ({ page, setPage, totalCount }: IProps) => {
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const totalGroups = Math.ceil(totalPages / 5);
  const [group, setGroup] = useState(1);

  const goPrevGroup = () => {
    if (group === 1) return;
    setGroup((prev) => prev - 1);
  };

  const goNextGroup = () => {
    if (group === totalGroups) return;
    setGroup((prev) => prev + 1);
  };

  const changePage = (value: number) => {
    setPage(value);
  };

  //초기 페이지 설정
  useEffect(() => {
    setPage(1);
  }, [setPage, totalCount]);

  return (
    <Container>
      {group !== 1 && (
        <Arrow onClick={goPrevGroup}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Arrow>
      )}
      <BtnArea>
        {[
          (group - 1) * 5 + 1,
          (group - 1) * 5 + 2,
          (group - 1) * 5 + 3,
          (group - 1) * 5 + 4,
          (group - 1) * 5 + 5,
        ].map((value, index) => {
          if (value <= totalPages) {
            return (
              <Btn
                key={index}
                onClick={() => changePage(value)}
                $isMatch={value === page}
              >
                {value}
              </Btn>
            );
          }
          return <></>;
        })}
      </BtnArea>
      {group !== totalGroups && totalGroups !== 0 && (
        <Arrow onClick={goNextGroup}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Arrow>
      )}
    </Container>
  );
};

export default Pagenation;
