import Link from "next/link";
import { PROFILE_MENU } from "../_constants/constants";
import { usePathname, useRouter } from "next/navigation";
import { useTokenStore } from "../stores";

export default function ProfilePopup() {
  const router = useRouter();
  const pathname = usePathname();
  const { setAccessToken } = useTokenStore();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken("");
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/", { scroll: false });
    }
  };

  return (
    <>
      {PROFILE_MENU.map((el, index) => {
        if (el.url) {
          return (
            <Link
              key={index}
              href={el.url}
              className="profile-popup-menu text-black"
            >
              {el.content}
            </Link>
          );
        } else {
          return (
            <button
              key={index}
              onClick={logout}
              className="profile-popup-menu text-red"
            >
              {el.content}
            </button>
          );
        }
      })}
    </>
  );
}
