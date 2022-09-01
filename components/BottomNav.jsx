import {
  RiHistoryLine,
  RiHomeLine,
  RiMenuLine,
  RiUser3Line,
} from "react-icons/ri";

const BottomNav = ({ className, active, setActive }) => {
  const changeTab = (tab) => () => setActive(tab);

  return (
    <nav className={className}>
      <div className="w-full h-full text-2xl text-white flex justify-evenly items-center">
        <button
          className={`w-8 h-full border-white ${
            active === "home" && "border-b-2"
          }`}
          onClick={changeTab("home")}
        >
          <RiHomeLine className="mx-auto" />
        </button>
        <button
          className={`w-8 h-full border-white ${
            active === "friends" && "border-b-2"
          }`}
          onClick={changeTab("friends")}
        >
          <RiUser3Line className="mx-auto" />
        </button>
        <button
          className={`w-8 h-full border-white  ${
            active === "transactions" && "border-b-2"
          }`}
          onClick={changeTab("transactions")}
        >
          <RiHistoryLine className="mx-auto" />
        </button>
        <button
          className={`w-8 h-full border-white  ${
            active === "menu" && "border-b-2"
          }`}
          onClick={changeTab("menu")}
        >
          <RiMenuLine className="mx-auto" />
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
