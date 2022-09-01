import { FaPlus, FaTag } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";

const GroupCard = ({ className }) => {
  return (
    <div className={className}>
      <div className="text-xl text-gray-200">
        <HiOutlineUserGroup className="inline" /> GROUP_NAME
      </div>
      <div className="w-full mt-0 mb-3 flex justify-start items-center flex-wrap">
        {Array(4)
          .fill("")
          .map((_, i) => (
            <div
              className="w-fit mt-1 px-3 py-1 mx-1 first:ml-0 text-[0.5rem] text-gray-700 bg-white rounded"
              key={i}
            >
              <FaTag className="inline-block" /> Tag
            </div>
          ))}
        <div className="w-5 h-5 mt-1 ml-1 group">
          <button className="px-2 py-[0.385rem] transition-all hidden group-hover:block text-[0.5rem] text-gray-700 bg-white rounded">
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="my-2 w-full max-h-16 overflow-hidden text-sm text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
        quidem. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem,
        odit?
      </div>
      <button className="absolute bottom-6 z-10 uppercase text-white rounded-md px-6 py-2 font-medium transition-colors duration-100 bg-purple-800 hover:bg-purple-600">
        Split Bill
      </button>
    </div>
  );
};

export default GroupCard;
