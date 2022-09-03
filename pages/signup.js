import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MdAddLocationAlt, MdLocationOn } from "react-icons/md";
import { ImUserCheck, ImUserPlus } from "react-icons/im";
import { RiShieldKeyholeFill } from "react-icons/ri";

import { verifyToken } from "../helper/auth";
import ProfileTab from "../components/ProfileTab";
import AddressTab from "../components/AddressTab";
import PhoneTab from "../components/PhoneTab";

const Signup = () => {
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const result = await verifyToken(router.query.tok);
        if (result.error) console.error(result.reason);
        else setVerified(true);
      } catch (err) {
        console.error(err);
        //show error message
      } finally {
        setLoading(false);
      }
    };
    if (router.query.tok) init();
  }, [router]);

  const goToNext = (e) => {
    e.preventDefault();
    // TODO: check for name and password to be not empty
    if (tab === 2) return;
    setTab((tab) => tab + 1);
  };

  const goBack = (e) => {
    e.preventDefault();
    setTab((tab) => tab - 1);
  };

  return (
    <div className="w-sreen h-screen overflow-hidden bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 relative">
      <div className="absolute inset-6 bg-white bg-opacity-10 rounded-lg">
        <div className="w-full min-h-[498px] p-6 absolute top-1/2 -translate-y-1/2">
          {!loading && verified ? (
            <>
              <div className="absolute -top-4 left-0 right-0 h-1 bg-gray-300 flex justify-evenly items-center">
                <div
                  className={`w-10 h-10 rounded-full text-lg flex justify-center items-center ${
                    tab !== 0
                      ? "scale-90 bg-gray-300 text-purple-700"
                      : "bg-gray-50 text-purple-900"
                  }`}
                >
                  {tab > 0 ? <ImUserCheck /> : <ImUserPlus />}
                </div>
                <div
                  className={`w-10 h-10 rounded-full text-lg flex justify-center items-center ${
                    tab !== 1
                      ? "scale-90 bg-gray-300 text-purple-700"
                      : "bg-gray-50 text-purple-900"
                  }`}
                >
                  {tab > 1 ? <MdLocationOn /> : <MdAddLocationAlt />}
                </div>
                <div
                  className={`w-10 h-10 rounded-full text-lg flex justify-center items-center ${
                    tab !== 2
                      ? "scale-90 bg-gray-300 text-purple-700"
                      : "bg-gray-50 text-purple-900"
                  }`}
                >
                  <RiShieldKeyholeFill />
                </div>
              </div>
              <div className="w-full">
                {tab === 0 && <ProfileTab />}
                {tab === 1 && <AddressTab />}
                {tab === 2 && <PhoneTab />}
                {tab !== 0 && (
                  <button
                    onClick={goBack}
                    className="absolute bottom-6 left-6 uppercase text-white rounded-md px-6 py-2 font-medium bg-purple-800 hover:bg-purple-600 shadow-xl"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={goToNext}
                  className="absolute bottom-6 right-6 uppercase text-white rounded-md px-6 py-2 font-medium bg-purple-800 hover:bg-purple-600 shadow-xl"
                >
                  {tab < 2 ? "Next" : "Done"}
                </button>
              </div>
            </>
          ) : (
            <div className="animate-pulse">
              <div className="mb-8 flex justify-between items-center">
                <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                <div className="w-3/4 h-8 rounded-lg bg-slate-300"></div>
              </div>
              <div className="w-full h-10 my-4 rounded-lg bg-slate-300"></div>
              <div className="w-full h-10 my-4 rounded-lg bg-slate-300"></div>
              <div className="w-full h-10 my-4 rounded-lg bg-slate-300"></div>
              <div className="absolute bottom-6 left-6 rounded-md w-24 h-10 bg-slate-300"></div>
              <div className="absolute bottom-6 right-6 rounded-md w-24 h-10 bg-slate-300"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
