import useAllData from "./useGetAllData";

// 특정 id를 가진 동물의 정보를 가져오는 함수
export const useGetDetail = (id: string | undefined) => {
  const { data: allData, isLoading } = useAllData();
  const data = allData?.find((value) => value.ABDM_IDNTFY_NO === id);
  return { data, isLoading };
};
