import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SearchBarProps, SearchForm } from "@/app/_interfaces/interfaces";
import { SmSearchIcon } from "./Icons";

export default function TopBarSearchBar({
  baseURL,
  placeholder,
}: SearchBarProps) {
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<SearchForm>();
  const onValid = ({ keyword }: { keyword: string }) => {
    router.push(`${baseURL}?keyword=${keyword}`, { scroll: false });
    setValue("keyword", "");
  };

  return (
    <div className="flex items-center gap-4">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex gap-2 w-full border border-border-2 rounded-full px-4 py-2"
      >
        <input
          {...register("keyword", {
            required: true,
          })}
          className="grow text-xs"
          placeholder={placeholder || "검색어를 입력해주세요"}
          autoComplete="off"
        />
        <button type="submit">
          <SmSearchIcon />
        </button>
      </form>
    </div>
  );
}
