import { RiLoader2Line, RiSendPlaneFill } from "react-icons/ri";
import {
  FaFacebookF,
  FaGoogle,
  FaInfoCircle,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { signin } from "../helper/auth";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { authenticate, isAuthenticated } from "../utils";

const Signin = () => {
  const router = useRouter();
  const [newUser, setNewUser] = useState(true);
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (name) => (e) =>
    setValues({ ...values, [name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email) return;
    if (!newUser && !values.password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    setError("");
    setMsg("");

    try {
      const result = await signin(values);
      if (result.error) setError(result.reason);
      else {
        if (!result.data) setMsg(result.message);
        else if (result.data.token) {
          setMsg("Login Successfull");
          setValues({ email: "", password: "" });
          const { user, token, expires } = result.data;
          authenticate({
            user: { _id: user._id, email: user.email, name: user.name },
            token,
            expiry: expires,
          });
          router.push("/");
        } else {
          setNewUser(false);
        }
      }
    } catch (err) {
      setError(err.reason || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (isAuthenticated()) router.replace("/");
  }, [error]);

  useEffect(() => {
    router.prefetch("/");
  }, []);

  return (
    <div className="w-sreen h-screen overflow-hidden bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 relative">
      <Toaster />
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
          <form className="w-full relative" onSubmit={handleSubmit}>
            <input
              type="email"
              className="w-full py-2 pl-3 pr-8 border focus:outline-none rounded-md bg-gray-50 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 shadow-xl"
              placeholder="Enter your Email..."
              value={values.email}
              onChange={handleChange("email")}
              disabled={!newUser}
            />
            {newUser && (
              <>
                <h4 className="absolute mt-4 top-full text-xs text-purple-50">
                  <FaInfoCircle className="inline-block" /> If you are a new
                  user, we will send you a joining link to your email
                </h4>
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute top-0 right-0 bottom-0 p-2 text-2xl rotate-45 hover:text-purple-500 text-purple-800"
                >
                  {loading ? (
                    <RiLoader2Line className="animate-spin-slow" />
                  ) : (
                    <RiSendPlaneFill />
                  )}
                </button>
              </>
            )}
            {!newUser && (
              <>
                <div className="relative w-full">
                  <input
                    type={showPass ? "text" : "password"}
                    className="w-full my-2 py-2 pl-3 pr-8 text-lg border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
                    placeholder="Enter your password..."
                    value={values.password}
                    onChange={handleChange("password")}
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
                <button
                  type="submit"
                  disabled={loading}
                  className="uppercase text-white rounded-md px-6 py-2 font-medium bg-purple-800 hover:bg-purple-600 shadow-xl"
                >
                  Log In
                  {loading && (
                    <RiLoader2Line className="ml-2 inline text-xl animate-spin-slow" />
                  )}
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
