import Link from "next/link";
import { useState } from "react";
import { FaPlus, FaTag } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";

import Modal from "./Modal";
import CreateBill from "./CreateBill";

const GroupCard = ({ className, data }) => {
  const [isBillOpen, setIsBillOpen] = useState(false);

  return (
    <div className={className}>
      <Link href={`/group/${data._id}`}>
        <div className="cursor-pointer">
          <div className="text-xl text-gray-200" title="click to view details">
            <HiOutlineUserGroup className="inline" /> {data.name}
          </div>
          <div className="w-full mt-0 mb-3 flex justify-start items-center flex-wrap">
            {data.tags.map((tag, i) => (
              <div
                className="w-fit mt-1 px-2 py-1 mr-1 text-[0.5rem] text-gray-700 bg-white rounded"
                key={i}
              >
                <FaTag className="inline-block" /> {tag}
              </div>
            ))}
          </div>
          <div className="my-2 w-full max-h-16 overflow-hidden text-sm text-gray-300">
            {data.description}
          </div>
        </div>
      </Link>

      <button
        onClick={() => setIsBillOpen(true)}
        className="absolute bottom-6 z-10 uppercase text-white rounded-md px-6 py-2 font-medium transition-colors duration-100 bg-purple-800 hover:bg-purple-600"
      >
        Split Bill
      </button>
      <Modal
        isOpen={isBillOpen}
        setIsOpen={setIsBillOpen}
        title="Split New Bill"
        bgPanel="bg-purple-200"
        textColor="text-purple-900"
      >
        <CreateBill
          setIsOpen={setIsBillOpen}
          members={[...data.members, data.creator]}
          groupId={data._id}
        />
      </Modal>
    </div>
  );
};

export default GroupCard;
