import { AiOutlineBell } from "react-icons/ai";

const SearchBar = ({ className }) => {
  return (
    <header className={className}>
      <div className="absolute w-full top-1/2 -translate-y-1/2 flex justify-center items-center">
        <input
          type="text"
          className="px-4 py-2 w-5/6 transition-all text-gray-50 bg-white bg-opacity-30 peer rounded-md focus:w-full"
          placeholder="Search Group..."
        />
        <button className="w-6 ml-2 text-2xl text-white flex justify-center items-center transition-all peer-focus:w-0">
          <AiOutlineBell />
        </button>
      </div>
    </header>
  );
};

export default SearchBar;
