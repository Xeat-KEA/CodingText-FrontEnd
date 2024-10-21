import { usePathname } from "next/navigation";
import { CODE_FILTER_LIST } from "../_constants/constants";
import { ALGORITHM_LIST, DIFFICULTY_LIST } from "@/app/_constants/constants";
import ParamDropDown from "@/app/_components/ParamDropDown";
import MultiSelectionDropDown from "@/app/_components/MultiSelectionDropdown";

export default function CodeFilter() {
  const pathname = usePathname();

  return (
    <>
      {/* 문제 필터링 */}
      <div className="w-full flex gap-4">
        <MultiSelectionDropDown
          placeholder="난이도"
          list={DIFFICULTY_LIST}
          paramType="difficulty"
        />
        <MultiSelectionDropDown
          placeholder="알고리즘"
          list={ALGORITHM_LIST}
          paramType="algorithm"
        />
        {/* 문제 목록 페이지에서만 렌더링 */}
        {pathname === "/code/list" && (
          <ParamDropDown
            paramType="order"
            list={CODE_FILTER_LIST[2].list}
            placeholder="최신순"
          />
        )}
      </div>
    </>
  );
}
