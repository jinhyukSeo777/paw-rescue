import useAllData from "./useGetAllData";

export const useGetDetail = (id: string | undefined) => {
  const { data: allData, isLoading } = useAllData();
  const data = allData?.find((value) => value.ABDM_IDNTFY_NO === id);
  return { data, isLoading };
};
