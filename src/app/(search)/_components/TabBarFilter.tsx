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
    router.push(`${pathname}?${newParams}`);
  };

  return (
    <div className="flex gap-3 items-center">
      {TAB_BAR_POST_FILTER.map((el) => (
        <button
          key={el.state}
          onClick={() => setFilter("category", el.state)}
          className={`text-xs ${
            searchParams.get("category") === el.state
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
          key={el.state}
          onClick={() => setFilter("order", el.state)}
          className={`text-xs ${
            searchParams.get("order") === el.state
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
