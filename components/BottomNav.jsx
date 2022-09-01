import { RiHistoryLine, RiHomeLine, RiMenuLine, RiUser3Line } from "react-icons/ri";

const BottomNav = ({ className }) => {
  return (
    <nav className={className}>
      <div className="w-full h-full text-2xl text-white flex justify-evenly items-center">
        <div>
          <RiHomeLine />
        </div>
        <div>
          <RiUser3Line />
        </div>
        <div>
          <RiHistoryLine />
        </div>
        <div>
          <RiMenuLine />
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
