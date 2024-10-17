import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SearchForm } from "@/app/_interfaces/interfaces";
import { SmSearchIcon } from "../Icons";

export default function SmSearchBar() {
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<SearchForm>();
  const onSubmit = ({ keyword }: { keyword: string }) => {
    router.push(`/search?keyword=${keyword}`, { scroll: false });
    setValue("keyword", "");
  };

  return (
    <div className="flex items-center gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 w-full border border-border-2 rounded-full px-4 py-2"
      >
        <input
          {...register("keyword", {
            required: true,
          })}
          className="grow text-xs"
          placeholder="검색어를 입력해주세요"
        />
        <button type="submit">
          <SmSearchIcon />
        </button>
      </form>
    </div>
  );
}
