import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { RiLoader2Line, RiSendPlaneFill } from "react-icons/ri";

const PhoneTab = ({ values, handleChange }) => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-2xl mb-6 text-purple-50">Verify Phone</h1>
      <form className="w-full relative" onSubmit={handleSubmit}>
        <input
          type="tel"
          pattern="[0-9]{10}"
          title="Ten digits Phone Number"
          className="w-full py-2 pl-3 pr-8 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
          placeholder="Enter your Phone Number..."
          value={values.phoneNumber}
          onChange={handleChange("phoneNumber")}
          disabled={otpSent}
          required
        />
        {!otpSent && (
          <button
            type="submit"
            disabled={loading}
            className="absolute top-0 right-0 bottom-0 p-2 text-2xl rotate-45 bg-transparent hover:text-purple-500 text-purple-800"
          >
            {loading ? (
              <RiLoader2Line className="animate-spin-slow" />
            ) : (
              <RiSendPlaneFill />
            )}
          </button>
        )}
      </form>
      {otpSent && (
        <div className="w-full my-6 relative">
          <input
            type="text"
            className="w-full py-2 px-3 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
            placeholder="Enter the Code sent to you..."
            value={values.otp}
            onChange={handleChange("otp")}
          />
          <h4 className="absolute mt-4 top-full text-xs text-purple-50">
            <FaInfoCircle className="inline-block" /> Please enter 000000 as the
            code
          </h4>
        </div>
      )}
    </div>
  );
};

export default PhoneTab;
