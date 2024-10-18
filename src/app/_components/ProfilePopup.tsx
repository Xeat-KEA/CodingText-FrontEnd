import Link from "next/link";
import { PROFILE_MENU } from "../_constants/constants";
import { usePathname, useRouter } from "next/navigation";

export default function ProfilePopup() {
  const router = useRouter();
  const pathname = usePathname();
  const logout = () => {
    localStorage.removeItem("token");
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
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
