import { BsCreditCard } from "react-icons/bs";
import { FaCheck, FaMinusSquare, FaPlusSquare, FaTimes } from "react-icons/fa";

const Transactions = ({ className }) => {
  return (
    <div className={className}>
      <div className="w-11/12 my-4 px-6 py-4 relative rounded-lg mx-auto max-w-xs bg-black bg-opacity-50 shadow-lg">
        <div className="text-xl text-gray-200">
          <BsCreditCard className="inline mr-2" /> ₹500
          <span className="ml-2 text-xs text-green-600">
            <FaPlusSquare className="inline" /> Cr
          </span>
        </div>
        <div className="text-xs text-white">
          From <span>USER_NAME</span> at <span>02/09/2022</span>
        </div>
        <div className="text-base text-white">
          Reference Number: <span>XXXXXXXXX7565</span>
        </div>
        <div className="absolute top-5 right-6 uppercase text-xs text-yellow-500">
          Pending
        </div>
      </div>
      <div className="w-11/12 my-4 px-6 py-4 relative rounded-lg mx-auto max-w-xs bg-black bg-opacity-50 shadow-lg">
        <div className="text-xl text-gray-200">
          <BsCreditCard className="inline mr-2" /> ₹500
          <span className="ml-2 text-xs text-red-600">
            <FaMinusSquare className="inline" /> Db
          </span>
        </div>
        <div className="text-xs text-white">
          From <span>USER_NAME</span> at <span>02/09/2022</span>
        </div>
        <div className="text-base text-white">
          Reference Number: <span>XXXXXXXXX7565</span>
        </div>
        <div className="absolute top-5 right-6 uppercase text-xs text-red-500">
          <FaTimes className="inline" /> Failed
        </div>
      </div>
      <div className="w-11/12 my-4 px-6 py-4 relative rounded-lg mx-auto max-w-xs bg-black bg-opacity-50 shadow-lg">
        <div className="text-xl text-gray-200">
          <BsCreditCard className="inline mr-2" /> ₹500
          <span className="ml-2 text-xs text-red-600">
            <FaMinusSquare className="inline" /> Db
          </span>
        </div>
        <div className="text-xs text-white">
          From <span>USER_NAME</span> at <span>02/09/2022</span>
        </div>
        <div className="text-base text-white">
          Reference Number: <span>XXXXXXXXX7565</span>
        </div>
        <div className="absolute top-5 right-6 uppercase text-xs text-green-500">
          <FaCheck className="inline" /> Success
        </div>
      </div>
    </div>
  );
};

export default Transactions;
