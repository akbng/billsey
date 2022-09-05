import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import Select from "react-select";
import { saveBillToGroup } from "../helper/group";
import { pushNotify } from "../helper/user";
import { isAuthenticated } from "../utils";

const CreateBill = ({ setIsOpen, members, groupId }) => {
  const [values, setValues] = useState({
    name: "",
    totalAmount: "",
  });
  const [users, setUsers] = useState([]);
  const [splitAmount, setSplitAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (name) => (e) =>
    setValues({ ...values, [name]: e.target.value });

  const saveBill = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { name, totalAmount } = values;
      if (!name || !totalAmount) throw Error("Please fill the required fields");
      const bill = {
        name,
        totalAmount,
        splitAmount,
        members: [...users.map((user) => user.value), user._id],
      };
      const newBill = await saveBillToGroup({ ...bill, token, groupId });
      if (newBill.error) throw Error(newBill.reason);
      if (users.length > 0)
        await Promise.all(
          users.map((User) =>
            pushNotify({
              token,
              notifications: { amount: splitAmount, payTo: user._id },
              userId: User.value,
            })
          )
        );
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { totalAmount } = values;
    if (totalAmount * 1) {
      const amt = totalAmount / (users.length + 1);
      setSplitAmount(Math.ceil(amt));
    } else setSplitAmount(0);
  }, [values, users]);

  return (
    <div>
      <form onSubmit={saveBill} className="mt-4">
        <input
          type="text"
          className="w-full py-2 px-3 border focus:outline-none rounded-md bg-gray-50 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 shadow-xl"
          placeholder="Bill Name..."
          onChange={handleChange("name")}
          value={values.name}
        />
        <div className="w-full relative">
          <input
            type="number"
            className="w-full py-2 pl-8 pr-3 my-4 border focus:outline-none rounded-md bg-gray-50 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 shadow-xl"
            placeholder="Total Amount..."
            onChange={handleChange("totalAmount")}
            value={values.totalAmount}
          />
          <div className="absolute top-4 bottom-4 left-0 flex items-center pl-2">
            <FaRupeeSign className="text-lg" />
          </div>
        </div>
        <Select
          placeholder="Select Members..."
          isMulti
          options={members
            .filter((member) => member._id !== user._id)
            .map((member) => ({
              label: member.name?.first + " " + member.name?.last,
              value: member._id,
            }))}
          className="shadow-xl rounded-md"
          onChange={setUsers}
          value={users}
        />
        <div className="my-4 text-2xl text-purple-900">
          <span className="text-base mr-2">
            {users.length > 0 ? "Everyone pays:" : "You Pay:"}
          </span>
          ₹{splitAmount}
        </div>
        <button
          type="submit"
          className="py-1 px-4 rounded-md transition-colors bg-purple-800 text-purple-200 hover:text-purple-50 hover:bg-purple-900 shadow-xl"
        >
          Save {users.length > 0 && "& Notify others"}
          {loading && (
            <RiLoader2Line className="ml-1 inline text-lg animate-spin-slow" />
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateBill;
