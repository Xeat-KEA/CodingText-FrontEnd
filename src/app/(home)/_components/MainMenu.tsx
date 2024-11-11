import { MAIN_MENU_LIST } from "../_constants/constants";
import MainMenuBtn from "./MainMenuBtn";

export default function MainMenu() {
  return (
    <div className="grid grid-cols-2 gap-12 sm:flex">
      {MAIN_MENU_LIST.map((el, index) => (
        <MainMenuBtn key={index} icon={el.icon} title={el.title} url={el.url} />
      ))}
    </div>
  );
}
