import { useEffect, useState } from "react";
import { ISearchBar, SearchForm } from "../_interfaces/interfaces";
import { LgSearchIcon } from "./Icons";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import DropDown from "./Dropdown";
import { CODE_SEARCH_FILTER_LIST } from "../(code)/_constants/constants";

export default function SearchBar({ baseURL }: ISearchBar) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit, setValue } = useForm<SearchForm>();
  const onSubmit = (data: SearchForm) => {
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

  const [filter, setFilter] = useState("");
  useEffect(() => {
    if (CODE_SEARCH_FILTER_LIST) {
      setFilter(CODE_SEARCH_FILTER_LIST[0]);
      setValue("filter", CODE_SEARCH_FILTER_LIST[0]);
    }
  }, []);

  return (
    <div className="flex items-center gap-4">
      {baseURL && (
        <div className="w-[92px] shrink-0">
          <DropDown
            isSmall
            borderRight
            list={CODE_SEARCH_FILTER_LIST}
            selection={filter ? filter : CODE_SEARCH_FILTER_LIST[0]}
            onSelectionClick={(selected) => {
              setFilter(selected);
              setValue("filter", selected);
            }}
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 w-full border border-border-2 rounded-full px-6 py-3"
      >
        <input
          {...register("keyword", {
            required: baseURL ? false : true,
          })}
          className="grow"
          placeholder="검색어를 입력해주세요"
        />
        <button type="submit">
          <LgSearchIcon />
        </button>
      </form>
    </div>
  );
}
