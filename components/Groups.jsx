import { FaPlus } from "react-icons/fa";
import GroupCard from "./GroupCard";

const Groups = ({ className }) => {
  return (
    <main className={className}>
      {Array(8)
        .fill("")
        .map((_, i) => {
          return (
            <GroupCard
              key={i}
              className="w-11/12 h-60 my-8 first:mt-4 p-6 relative rounded-lg mx-auto max-w-xs bg-black bg-opacity-50 shadow-lg"
            />
          );
        })}
      <button className="fixed bottom-14 right-4 z-20 text-white bg-gradient-to-l from-indigo-900 to-purple-900 py-2 px-4 rounded">
        <FaPlus className="inline mr-1" /> New Group
      </button>
    </main>
  );
};

export default Groups;
