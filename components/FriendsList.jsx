import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { useEffect, useState } from "react";

import { isAuthenticated } from "../utils";
import { addFriend, getFriends, getUsers } from "../helper/user";
import { RiLoader2Line } from "react-icons/ri";

const Skeleton = () => (
  <div className="my-5 first:mt-2 flex justify-start items-center animate-pulse">
    <div className="w-8 h-8 mr-4 rounded-full bg-gray-200" />
    <div className="w-4/5 h-8 rounded-lg bg-gray-200" />
  </div>
);

const FriendsList = ({ className }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState("");

  const handleAddFriend = (id) => async () => {
    const { token } = isAuthenticated();
    setAdding(id);
    try {
      await addFriend(id, token);
      setAllUsers(allUsers.filter((user) => user._id !== id));
      setFriends([...friends, allUsers.find((user) => user._id === id)]);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding("");
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const { token } = isAuthenticated();
        const friendsList = await getFriends(token);
        setFriends(friendsList.data);
        const users = await getUsers(token);
        setAllUsers(users.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <div className={className}>
      <div className="w-11/12 max-h-60 mt-2 mb-4 px-6 pb-2 rounded-lg mx-auto max-w-xs bg-black bg-opacity-50 shadow-lg overflow-hidden">
        <h1 className="my-2 text-xl text-white">
          <FaUserFriends className="inline mr-1" /> Friends
        </h1>
        <div className="w-full h-48 overflow-y-auto">
          {loading ? (
            Array(3)
              .fill("")
              .map((_, i) => <Skeleton key={i} />)
          ) : friends.length > 0 ? (
            friends.map((friend) => (
              <div
                key={friend._id}
                className="my-5 first:mt-2 flex justify-start items-center"
              >
                <div className="w-8 h-8 mr-4 rounded-full bg-fuchsia-800" />
                <div>
                  <div className="text-lg text-white">
                    {friend.name.first} {friend.name.last}
                  </div>
                  <div className="text-xs text-gray-200">
                    <div className="w-2 h-2 mr-1 rounded-full bg-red-600 inline-block"></div>
                    Offline
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center text-xl text-white">
              <IoIosWarning className="inline mr-2" /> No Friends
            </div>
          )}
        </div>
      </div>
      <div className="w-11/12 max-h-96 h-2/3 my-4 px-6 pb-2 rounded-lg mx-auto max-w-xs bg-black bg-opacity-50 shadow-lg overflow-hidden">
        <h1 className="my-2 text-xl text-white">
          <MdOutlineExplore className="inline mr-1" /> Explore
        </h1>
        <div className="w-full h-5/6 max-h-80 overflow-y-auto">
          {loading ? (
            Array(3)
              .fill("")
              .map((_, i) => <Skeleton key={i} />)
          ) : allUsers.length > 0 ? (
            allUsers.map((user) => (
              <div
                key={user._id}
                className="my-5 first:mt-2 flex justify-start items-center relative"
              >
                <div className="w-8 h-8 mr-4 rounded-full bg-fuchsia-800" />
                <div className="text-lg text-white">
                  {user.name.first} {user.name.last}
                </div>
                <button
                  onClick={handleAddFriend(user._id)}
                  disabled={adding}
                  className="absolute top-1/2 -translate-y-1/2 right-0 py-1 px-2 rounded-md bg-gradient-to-r from-indigo-900 to-purple-900"
                >
                  <div className="uppercase text-xs text-white">
                    {adding === user._id ? (
                      <RiLoader2Line className="mr-1 inline animate-spin-slow" />
                    ) : (
                      <FaUserPlus className="inline mr-1" />
                    )}
                    add
                  </div>
                </button>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center text-xl text-white">
              <IoIosWarning className="inline mr-2" /> No More Users Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
