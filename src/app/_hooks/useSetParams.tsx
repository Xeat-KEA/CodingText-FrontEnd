import { usePathname, useRouter, useSearchParams } from "next/navigation";

// 파라미터 변경 Hook
export const useSetParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 파라미터 변경 함수
  const setParams = (
    paramType: string,
    param: string | { selected: string; list: string[] }
  ) => {
    if (typeof param === "string") {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(paramType, param);
      router.push(`${pathname}?${newParams}`);
    }
    if (typeof param === "object") {
      let newParamList = [...param.list];

      // 기존 파라미터에 선택된 파라미터가 존재하는지 확인 후 처리
      if (newParamList.includes(param.selected)) {
        newParamList = newParamList.filter((el) => el !== param.selected);
      } else {
        newParamList.push(param.selected);
      }

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(paramType, newParamList.join(","));
      router.push(`${pathname}?${newParams}`);
    }
  };

  return setParams;
};
