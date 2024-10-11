import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IData } from "../pages/Home";

// 데이터 가져오는 함수
export const fetchData = async (page: number): Promise<IData[]> => {
  const KEY = process.env.REACT_APP_KEY;
  const { data } = await axios.get(
    `https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=${KEY}&Type=json&pSize=1000&page=${page}`
  );
  return data.AbdmAnimalProtect[1].row;
};

// 모든 페이지의 데이터를 병렬로 요청하는 함수
export const fetchAllData = async () => {
  const totalPages = 10; // 10,000개의 데이터를 가져오려면 1,000개씩 10 페이지 필요
  const queries = [];

  // 1~10 페이지까지 요청을 생성
  for (let i = 1; i <= totalPages; i++) {
    queries.push(fetchData(i));
  }

  // 모든 페이지의 데이터를 병렬로 요청
  const results = await Promise.all(queries);

  // 모든 페이지의 데이터를 하나로 합치기
  return results.flat();
};

// 커스텀 훅으로 데이터 가져오기
const useAllData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["allData"],
    queryFn: fetchAllData,
  });

  return { data, error, isLoading };
};

export default useAllData;