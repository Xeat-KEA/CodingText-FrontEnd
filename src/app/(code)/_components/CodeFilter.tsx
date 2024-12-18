import { CODE_SORT_BY } from "../_constants/constants";
import { ALGORITHM_LIST, DIFFICULTY_LIST } from "@/app/_constants/constants";
import MultiSelectionDropDown from "@/app/_components/MultiSelectionDropdown";
import ParamDropDown from "@/app/_components/ParamDropdown";

export default function CodeFilter({ hasOrder }: { hasOrder?: boolean }) {
  return (
    <>
      {/* 문제 필터링 */}
      <MultiSelectionDropDown
        placeholder="난이도"
        list={DIFFICULTY_LIST}
        paramType="difficulties"
      />
      <MultiSelectionDropDown
        placeholder="알고리즘"
        list={ALGORITHM_LIST}
        paramType="algorithms"
      />
      {/* 문제 목록 페이지에서만 렌더링 */}
      {hasOrder && (
        <ParamDropDown
          paramType="order"
          list={CODE_SORT_BY}
          placeholder="최신순"
        />
      )}
    </>
  );
}
