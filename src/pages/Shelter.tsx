import styled from "styled-components";
import { DESKTOP } from "../utils/size";
import { useCallback, useEffect, useState } from "react";
import { IData } from "./Home";
import { LEGION as LEGIONS } from "../components/chart/Charts";
import Dropdown from "../components/common/Dropdown";
import ShowItems from "../components/common/ShowItems";
import Pagenation from "../components/common/Pagenation";
import SheltersMap, { IShelter } from "../components/common/SheltersMap";
import useGetAllData from "../hooks/useGetAllData";

const Container = styled.main`
  width: 90%;
  max-width: ${DESKTOP};
  margin: 0 auto;
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const H2 = styled.h2`
  font-size: 2rem;
`;

const DropdownArea = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 3rem;
  @media (max-width: 710px) {
    justify-content: center;
  }
`;

const LEGION = ["전체", ...LEGIONS];
const STATE = ["전체", "보호중", "종료"];
const SPECIES = ["전체", "강아지", "고양이", "그외"];
const AGE = ["전체", "1세미만", "1살~5살", "6살~9살", "10살이상"];
const SEX = ["전체", "남아", "여아"];
const NEUT = ["전체", "완료", "미완료", "알수없음"];

const Shelter = () => {
  const [filteredData, setFilteredData] = useState<IData[]>([]);
  const [legion, setLegion] = useState("전체");
  const [state, setState] = useState("전체");
  const [species, setSpecies] = useState("전체");
  const [age, setAge] = useState("전체");
  const [sex, setSex] = useState("전체");
  const [neut, setNeut] = useState("전체");
  const [page, setPage] = useState(1);
  const [shelters, setShelters] = useState<IShelter[]>([]);
  const [shelterName, setShelterName] = useState("전체");
  const [selectedDropDown, setSelectedDropDown] = useState("");

  const { data } = useGetAllData();

  const filterShelter = useCallback(
    (value: string) => {
      if (shelterName === "전체") return true;
      if (value === shelterName) return true;
      return false;
    },
    [shelterName]
  );
  const filterLegion = useCallback(
    (value: string) => {
      if (legion === "전체") return true;
      if (value === legion) return true;
      return false;
    },
    [legion]
  );
  const filterState = useCallback(
    (value: string) => {
      if (state === "전체") return true;
      if (value.includes(state)) return true;
      return false;
    },
    [state]
  );
  const filterSpecies = useCallback(
    (value: string) => {
      if (species === "전체") return true;
      if (species === "강아지" && value.includes("개")) return true;
      if (species === "고양이" && value.includes("고양이")) return true;
      if (
        species === "그외" &&
        !value.includes("개") &&
        !value.includes("고양이")
      )
        return true;
      return false;
    },
    [species]
  );
  const filterAge = useCallback(
    (value: string) => {
      const today = new Date();
      const year = today.getFullYear();
      const birthYear = +value.slice(0, 4);
      const diff = year - birthYear;
      if (age === "전체") return true;
      if (age === "1세미만" && diff === 0) return true;
      if (age === "1살~5살" && diff >= 1 && diff <= 4) return true;
      if (age === "6살~9살" && diff >= 5 && diff <= 8) return true;
      if (age === "10살이상" && diff >= 9) return true;
      return false;
    },
    [age]
  );
  const filterSex = useCallback(
    (value: string) => {
      if (sex === "전체") return true;
      if (sex === "남아" && value === "M") return true;
      if (sex === "여아" && value === "F") return true;
      return false;
    },
    [sex]
  );
  const filterNeut = useCallback(
    (value: string) => {
      if (neut === "전체") return true;
      if (neut === "완료" && value === "Y") return true;
      if (neut === "미완료" && value === "N") return true;
      if (neut === "알수없음" && value === "U") return true;
      return false;
    },
    [neut]
  );

  // 초기 데이터 저장
  useEffect(() => {
    if (!data) return;
    setFilteredData(data);
  }, [data]);

  // 전체 보호소 정보 가져오는 함수
  useEffect(() => {
    if (!data || shelterName !== "전체") return;
    setFilteredData(data);

    // 객체를 문자열로 변환 후 Set에 저장
    // Set을 사용하는 이유는 중복을 없애기 위해
    const sheltersData: IShelter[] = Array.from(
      new Set(
        data.map((item) =>
          JSON.stringify({
            REFINE_WGS84_LOGT: item.REFINE_WGS84_LOGT,
            REFINE_WGS84_LAT: item.REFINE_WGS84_LAT,
            SHTER_NM: item.SHTER_NM,
          })
        )
      )
    ).map((item) => JSON.parse(item)); // 다시 객체로 반환
    setShelters(sheltersData);
  }, [data, shelterName]);

  // 조건에 맞는 정보 필터링하는 함수
  useEffect(() => {
    const newData = data?.filter((value) => {
      if (!filterShelter(value.SHTER_NM)) return false;
      if (!filterLegion(value.SIGUN_NM)) return false;
      if (!filterState(value.STATE_NM)) return false;
      if (!filterSpecies(value.SPECIES_NM)) return false;
      if (!filterAge(value.AGE_INFO)) return false;
      if (!filterSex(value.SEX_NM)) return false;
      if (!filterNeut(value.NEUT_YN)) return false;
      return true;
    });
    setFilteredData(newData || []);
    setPage(1);
  }, [
    shelterName,
    legion,
    state,
    species,
    age,
    sex,
    neut,
    data,
    filterShelter,
    filterLegion,
    filterState,
    filterSpecies,
    filterAge,
    filterSex,
    filterNeut,
  ]);

  return (
    <Container>
      <H2>나와 가까운 보호소를 클릭해 보세요</H2>
      <SheltersMap
        shelters={shelters}
        setShelterName={setShelterName}
        zoomable={true}
      />
      <DropdownArea>
        <Dropdown
          category="시도군"
          data={LEGION}
          setState={setLegion}
          isOpen={selectedDropDown === "시도군"}
          setSelectedDropDown={setSelectedDropDown}
        />
        <Dropdown
          category="상태"
          data={STATE}
          setState={setState}
          isOpen={selectedDropDown === "상태"}
          setSelectedDropDown={setSelectedDropDown}
        />
        <Dropdown
          category="품종"
          data={SPECIES}
          setState={setSpecies}
          isOpen={selectedDropDown === "품종"}
          setSelectedDropDown={setSelectedDropDown}
        />
        <Dropdown
          category="나이"
          data={AGE}
          setState={setAge}
          isOpen={selectedDropDown === "나이"}
          setSelectedDropDown={setSelectedDropDown}
        />
        <Dropdown
          category="성별"
          data={SEX}
          setState={setSex}
          isOpen={selectedDropDown === "성별"}
          setSelectedDropDown={setSelectedDropDown}
        />
        <Dropdown
          category="중성화"
          data={NEUT}
          setState={setNeut}
          isOpen={selectedDropDown === "중성화"}
          setSelectedDropDown={setSelectedDropDown}
        />
      </DropdownArea>
      <H2>
        {shelterName === "전체" ? "경기도" : shelterName}에서 친구들이 기다리고
        있어요
      </H2>
      <ShowItems data={filteredData.slice((page - 1) * 20, page * 20)} />
      <Pagenation
        page={page}
        setPage={setPage}
        totalCount={filteredData.length}
      />
    </Container>
  );
};

export default Shelter;
