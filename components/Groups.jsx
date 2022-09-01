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
              className="w-11/12 h-60 my-8 first:mt-4 p-6 relative rounded-lg mx-auto max-w-xs bg-white bg-opacity-20 shadow-lg"
            />
          );
        })}
    </main>
  );
};

export default Groups;
