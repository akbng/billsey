import { FaUserFriends } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";

const FriendsList = ({ className }) => {
  return (
    <div className={className}>
      <div className="w-11/12 max-h-60 mt-2 mb-4 px-6 pb-2 rounded-lg mx-auto max-w-xs bg-black bg-opacity-50 shadow-lg overflow-hidden">
        <h1 className="my-2 text-xl text-white">
          <FaUserFriends className="inline mr-1" /> Friends
        </h1>
        <div className="w-full h-48 overflow-y-auto">
          {Array(8)
            .fill("")
            .map((_, i) => (
              <div
                key={i}
                className="my-5 first:mt-2 flex justify-start items-center"
              >
                <div className="w-8 h-8 mr-4 rounded-full bg-fuchsia-800" />
                <div>
                  <div className="text-lg text-white">Alice Poper</div>
                  <div className="text-xs text-gray-200">
                    <div className="w-2 h-2 mr-1 rounded-full bg-green-600 inline-block"></div>
                    Online
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-11/12 max-h-96 h-2/3 my-4 px-6 pb-2 rounded-lg mx-auto max-w-xs bg-black bg-opacity-50 shadow-lg overflow-hidden">
        <h1 className="my-2 text-xl text-white">
          <MdOutlineExplore className="inline mr-1" /> Explore
        </h1>
        <div className="w-full h-5/6 max-h-80 overflow-y-auto">
          {Array(8)
            .fill("")
            .map((_, i) => (
              <div
                key={i}
                className="my-5 first:mt-2 flex justify-start items-center"
              >
                <div className="w-8 h-8 mr-4 rounded-full bg-fuchsia-800" />
                <div>
                  <div className="text-lg text-white">Alice Poper</div>
                  <div className="text-xs text-gray-200">
                    <div className="w-2 h-2 mr-1 rounded-full bg-green-600 inline-block"></div>
                    Online
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
