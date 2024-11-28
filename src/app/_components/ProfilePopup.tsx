import Link from "next/link";
import { PROFILE_MENU } from "../_constants/constants";
import { usePathname, useRouter } from "next/navigation";
import { useTokenStore } from "../stores";
import api from "../_api/config";

export default function ProfilePopup() {
  const router = useRouter();
  const pathname = usePathname();
  const { setAccessToken } = useTokenStore();
  const logout = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await api.post(
        "/user-service/auth/logout",
        {},
        { headers: { UserId: userId } }
      );
      localStorage.clear();
      setAccessToken("");
      if (pathname === "/") {
        window.location.reload();
      } else {
        router.push("/", { scroll: false });
      }
    } catch (err) {
      console.error(err);
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
