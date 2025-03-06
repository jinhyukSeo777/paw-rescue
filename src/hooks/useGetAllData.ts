import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IData } from "../pages/Home";

// 데이터 가져오는 함수
export const fetchData = async (page: number): Promise<IData[]> => {
  const KEY = process.env.REACT_APP_KEY;
  const { data } = await axios.get(
    `https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=${KEY}&Type=json&pSize=1000&pIndex=${page}`
  );
  return data.AbdmAnimalProtect[1].row;
};

// 10페이지까지 병렬로 처리하고, 그 후에는 순차적으로 데이터를 요청하는 함수
export const fetchAllData = async () => {
  let allData: IData[] = [];
  const totalPagesToFetchInParallel = 8; // 병렬로 요청할 페이지 수
  let currentPage = 1;

  // 1~10 페이지는 병렬로 요청
  const parallelQueries = [];
  for (let i = 1; i <= totalPagesToFetchInParallel; i++) {
    parallelQueries.push(fetchData(i));
  }

  const parallelResults = await Promise.all(parallelQueries);

  // 데이터를 flat()으로 병합
  allData = parallelResults.flat();

  // 11페이지 이후는 순차적으로 요청
  currentPage = totalPagesToFetchInParallel + 1;
  while (true) {
    const data = await fetchData(currentPage);

    allData = [...allData, ...data];

    // 1000개보다 적은 데이터를 받으면 마지막 페이지로 간주
    if (data.length < 1000) {
      break;
    }
    currentPage++;
  }

  return allData;
};

// 데이터 가져오는 커스텀 훅
const useGetAllData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["allData"],
    queryFn: fetchAllData,
  });

  return { data, error, isLoading };
};

export default useGetAllData;
