import { useEffect, useState } from "react";
import { SearchBarProps, SearchForm } from "../_interfaces/interfaces";
import { LgSearchIcon } from "./Icons";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import DropDown from "./DropDown";
import { CODE_SEARCH_FILTER_LIST } from "../(code)/_constants/constants";

export default function SearchBar({
  baseURL,
  hasFilter,
  placeholder,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit, setValue } = useForm<SearchForm>();
  const onValid = (data: SearchForm) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("keyword", data.keyword);
    if (data.filter) {
      newParams.set("filter", data.filter);
    }
    router.push(`${baseURL}?${newParams}`, {
      scroll: false,
    });
  };

  // 키워드 변경 시 input 안의 값 변경
  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword !== null) {
      setValue("keyword", keyword);
    }
  }, [searchParams]);

  // 드롭다운 값 변경을 위한 state
  const [filter, setFilter] = useState("");
  useEffect(() => {
    if (hasFilter) {
      setFilter(CODE_SEARCH_FILTER_LIST[0].content);
      setValue("filter", CODE_SEARCH_FILTER_LIST[0].selection);
    }
  }, []);

  return (
    <div className="flex items-center gap-4">
      {hasFilter && (
        <div className="w-[92px] shrink-0">
          <DropDown
            isSmall
            borderRight
            list={CODE_SEARCH_FILTER_LIST}
            selection={filter ? filter : CODE_SEARCH_FILTER_LIST[0].content}
            onSelectionClick={(selected) => {
              setFilter(selected.content);
              setValue("filter", selected.selection);
            }}
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex gap-2 w-full border border-border-2 rounded-full px-6 py-3"
      >
        <input
          {...register("keyword", {
            required: baseURL ? false : true,
          })}
          className="grow"
          placeholder={placeholder || "검색어를 입력해주세요"}
          autoComplete="off"
        />
        <button type="submit">
          <LgSearchIcon />
        </button>
      </form>
    </div>
  );
}
