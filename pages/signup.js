import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MdAddLocationAlt, MdLocationOn } from "react-icons/md";
import { ImUserCheck, ImUserPlus } from "react-icons/im";
import { RiShieldKeyholeFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

import { signup, verifyToken } from "../helper/auth";
import ProfileTab from "../components/ProfileTab";
import AddressTab from "../components/AddressTab";
import PhoneTab from "../components/PhoneTab";
import { authenticate, isAuthenticated } from "../utils";

const Signup = () => {
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    addressLine: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
    phoneNumber: "",
    otp: "",
  });

  const handleValues = (name) => (e) =>
    setValues((prevValues) => ({ ...prevValues, [name]: e.target.value }));

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const result = await verifyToken(router.query.tok);
        if (result.error) toast.error(result.reason);
        else {
          setVerified(true);
          setEmail(result.data.sub);
        }
      } catch (err) {
        toast.error(err.reason || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (router.query.tok) init();
  }, [router]);

  useEffect(() => {
    router.prefetch("/");
    if (isAuthenticated()) router.replace("/");
  }, []);

  const goToNext = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      password,
      confirmPassword,
      addressLine,
      city,
      pincode,
    } = values;
    if (tab === 0) {
      if (!firstName || !lastName || !password || !confirmPassword) {
        toast.error("Please! Fill all the fields before proceeding.");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords did not match");
        return;
      }
      setTab((pt) => pt + 1);
    }
    if (tab === 1) {
      if (!addressLine || !city || !pincode) {
        toast.error("Please! Fill all the fields before proceeding.");
        return;
      }
      setTab((pt) => pt + 1);
    }
    if (tab === 2) {
      const { landmark, state, phoneNumber, otp } = values;
      if (!phoneNumber) {
        toast.error("Please Enter Phone number");
        return;
      }
      if (otp !== "000000") {
        toast.error("Please Enter 000000 in the OTP field");
        return;
      }
      const token = router.query.tok;
      const user = {
        name: { first: firstName, last: lastName },
        email: email,
        password: password,
        phone: phoneNumber,
        address: {
          line: addressLine,
          landmark: landmark,
          city: city,
          pincode: parseInt(pincode),
          state: state,
        },
      };
      try {
        const result = await signup(user, token);
        if (result.error) toast.error(result.reason);
        else {
          const { user, token, expires } = result.data;
          authenticate({
            user: { _id: user._id, email: user.email, name: user.name },
            token,
            expiry: expires,
          });
          router.push("/");
        }
      } catch (err) {
        toast.error(err.reason || err.message);
      }
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    setTab((tab) => tab - 1);
  };

  return (
    <div className="w-sreen h-screen overflow-hidden bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 relative">
      <Toaster />
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
                {tab === 0 && (
                  <ProfileTab values={values} handleChange={handleValues} />
                )}
                {tab === 1 && (
                  <AddressTab values={values} handleChange={handleValues} />
                )}
                {tab === 2 && (
                  <PhoneTab values={values} handleChange={handleValues} />
                )}
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
