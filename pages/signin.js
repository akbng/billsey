import { RiSendPlaneFill } from "react-icons/ri";
import { FaFacebookF, FaGoogle, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

const Signin = () => {
  const [verified, setVerified] = useState(false);

  return (
    <div className="w-sreen h-screen overflow-hidden bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 relative">
      <div className="absolute inset-6 bg-white bg-opacity-10 rounded-lg">
        <div className="w-full min-h-[498px] p-6 absolute top-1/2 -translate-y-1/2">
          <h1 className="text-4xl text-purple-50">Welcome to Billsey</h1>
          <h2 className="text-sm mt-4 text-purple-50">Login with Social</h2>
          <div className="my-6">
            <button className="p-4 bg-white text-purple-900 rounded-md mr-2 shadow-xl hover:scale-105 active:scale-95">
              <FaGoogle />
            </button>
            <button className="p-4 bg-white text-purple-900 rounded-md ml-2 shadow-xl hover:scale-105 active:scale-95">
              <FaFacebookF />
            </button>
          </div>
          <h3 className="mb-6 text-2xl text-purple-50 font-semibold">OR</h3>
          <form
            className="w-full relative"
            onSubmit={(e) => {
              e.preventDefault();
              setVerified(!verified);
            }}
          >
            <input
              type="email"
              className="w-full py-2 pl-3 pr-8 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
              placeholder="Enter your Email..."
              disabled={verified}
            />
            {!verified && (
              <>
                <h4 className="absolute mt-4 top-full text-xs text-purple-50">
                  <FaInfoCircle className="inline-block" /> If you are a new
                  user, we will send you a joining link to your email
                </h4>
                <button
                  type="submit"
                  className="absolute top-0 right-0 bottom-0 p-2 text-2xl rotate-45 hover:text-purple-500 text-purple-800"
                >
                  <RiSendPlaneFill />
                </button>
              </>
            )}
            {verified && (
              <>
                <input
                  type="password"
                  className="w-full my-6 py-2 pl-3 pr-8 text-lg border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
                  placeholder="Enter your password..."
                />
                <button className="uppercase text-white rounded-md px-6 py-2 font-medium bg-purple-800 hover:bg-purple-600 shadow-xl">
                  Log In
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
