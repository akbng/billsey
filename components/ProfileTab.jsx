import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ProfileTab = () => {
  const [showPass, setShowPass] = useState(false);
  const [showCoPass, setShowCoPass] = useState(false);

  return (
    <div>
      <h1 className="text-2xl mb-6 text-purple-50">Complete your profile</h1>
      <input
        type="text"
        className="w-full my-2 py-2 px-3 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
        placeholder="Enter your First Name..."
      />
      <input
        type="text"
        className="w-full my-2 py-2 px-3 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
        placeholder="Enter your Last Name..."
      />
      <div className="relative w-full">
        <input
          type={showPass ? "text" : "password"}
          className="w-full my-2 py-2 pl-3 pr-8 text-lg border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
          placeholder="Enter your password..."
        />
        <div
          onClick={() => setShowPass(!showPass)}
          className="absolute top-0 bottom-0 right-0 flex items-center px-2"
        >
          {showPass ? (
            <FaRegEyeSlash className="text-purple-800 text-xl cursor-pointer" />
          ) : (
            <FaRegEye className="text-purple-800 text-xl cursor-pointer" />
          )}
        </div>
      </div>
      <div className="relative w-full">
        <input
          type={showCoPass ? "text" : "password"}
          className="w-full my-2 py-2 pl-3 pr-8 text-lg border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
          placeholder="Confirm your password..."
        />
        <div
          onClick={() => setShowCoPass(!showCoPass)}
          className="absolute top-0 bottom-0 right-0 flex items-center px-2"
        >
          {showCoPass ? (
            <FaRegEyeSlash className="text-purple-800 text-xl cursor-pointer" />
          ) : (
            <FaRegEye className="text-purple-800 text-xl cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
