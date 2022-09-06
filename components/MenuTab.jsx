import React from "react";
import { MdPayments, MdWbSunny } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/router";
import { removeToken } from "../utils";

const MenuTab = ({ className }) => {
  const router = useRouter();
  const logout = () => {
    removeToken();
    router.push("/signin");
  };

  return (
    <div className={className}>
      <div className="w-11/12 mt-4 mb-2 first:mt-4 p-6 text-white relative rounded-lg mx-auto max-w-xs bg-black bg-opacity-50 shadow-lg">
        <div className="w-full flex justify-between items-center">
          <div className="text-2xl">Good Morning!</div>
          <MdWbSunny className="ml-4 text-4xl" />
        </div>
        <div className="mt-4 w-full flex justify-start items-start">
          <div className="w-8 h-8 mr-4 rounded-full bg-fuchsia-800" />
          <div className="text-xl">Ankan</div>
        </div>
        <div className="-mt-2 text-center text-sm">
          Balance: <span className="text-4xl ml-2">₹999</span>
        </div>
      </div>
      <div className="w-11/12 max-w-xs mt-2 mx-auto flex justify-around items-center">
        <button className="w-3/5 h-20 text-gray-800 bg-white bg-opacity-30 text-xs flex justify-center items-center flex-col rounded-l-lg hover:bg-opacity-70 active:scale-95">
          <AiFillNotification className="my-2" /> <div>Notifications</div>
        </button>
        <button className="w-3/5 h-20 text-white bg-black bg-opacity-50 text-xs flex justify-center items-center flex-col rounded-r-lg hover:bg-opacity-90 active:scale-95">
          <MdPayments className="my-2" /> <div>Withdraw Balance</div>
        </button>
      </div>
      <button
        onClick={logout}
        className="w-11/12 max-w-xs mt-2 mx-auto bg-white bg-opacity-30 px-6 py-2 flex justify-center items-center rounded-lg hover:bg-opacity-70 active:scale-95"
      >
        <IoMdExit className="mr-4 text-xl" />
        Log Out
      </button>
    </div>
  );
};

export default MenuTab;
