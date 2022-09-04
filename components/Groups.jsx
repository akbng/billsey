import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { getGroupsOfMember } from "../helper/group";
import { getFriends, getUsers } from "../helper/user";
import { isAuthenticated } from "../utils";
import CreateGroupForm from "./CreateGroupForm";

import GroupCard from "./GroupCard";
import Modal from "./Modal";

const Groups = ({ className }) => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { user, token } = isAuthenticated();
      try {
        const result = await getGroupsOfMember(user._id, token);
        if (result.error) throw Error(result.reason);
        setGroups(result.data);
        setLoading(false);
        const friendsList = await getFriends(token);
        const others = await getUsers(token);
        setUsers([...friendsList.data, ...others.data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <main className={className}>
      {loading ? (
        Array(3)
          .fill("")
          .map((_, i) => (
            <div
              className="w-11/12 h-60 my-8 first:mt-4 p-6 rounded-lg mx-auto max-w-xs bg-gray-900 animate-pulse"
              key={i}
            />
          ))
      ) : groups.length > 0 ? (
        groups.map((group, i) => {
          return (
            <GroupCard
              key={i}
              data={group}
              className="w-11/12 h-60 my-8 first:mt-4 p-6 relative rounded-lg mx-auto max-w-xs bg-black bg-opacity-50 shadow-lg"
            />
          );
        })
      ) : (
        <div className="absolute inset-0 p-8 flex justify-center items-center text-center text-gray-100 text-2xl">
          PLEASE ADD NEW GROUP!
        </div>
      )}
      <button
        className="fixed bottom-14 right-4 z-10 text-white bg-gradient-to-l from-indigo-900 to-purple-900 py-2 px-4 rounded"
        onClick={() => setIsCreateOpen(true)}
      >
        <FaPlus className="inline mr-1" /> New Group
      </button>
      <Modal
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        title="Create New Group"
        bgPanel="bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900"
        textColor="text-gray-200"
      >
        <CreateGroupForm
          setIsOpen={setIsCreateOpen}
          friends={users}
          setGroups={setGroups}
        />
      </Modal>
    </main>
  );
};

export default Groups;
