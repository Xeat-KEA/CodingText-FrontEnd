import {
  TAB_BAR_ORDER_FILTER,
  TAB_BAR_POST_FILTER,
} from "@/app/_constants/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TabBarFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const setFilter = (type: string, newTab: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(type, newTab);
    router.push(`${pathname}?${newParams}`, { scroll: false });
  };

  return (
    <div className="flex gap-3 items-center">
      {TAB_BAR_POST_FILTER.map((el) => (
        <button
          key={el.selection}
          onClick={() => setFilter("category", el.selection)}
          className={`text-xs ${
            searchParams.get("category") === el.selection
              ? "text-primary font-semibold"
              : "text-disabled"
          }`}
        >
          {el.content}
        </button>
      ))}
      <div className="w-[1px] h-3 bg-border-2" />
      {TAB_BAR_ORDER_FILTER.map((el) => (
        <button
          key={el.selection}
          onClick={() => setFilter("order", el.selection)}
          className={`text-xs ${
            searchParams.get("order") === el.selection
              ? "text-primary font-semibold"
              : "text-disabled"
          }`}
        >
          {el.content}
        </button>
      ))}
    </div>
  );
}
