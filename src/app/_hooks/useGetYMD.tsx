import dayjs from "dayjs";

export const useGetYMD = (date: string) => {
  const ymd = dayjs(date).format("YYYY.MM.DD");
  return ymd;
};
