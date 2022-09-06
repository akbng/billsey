import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsCreditCard } from "react-icons/bs";
import { FaPlus, FaTag } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiBillLine } from "react-icons/ri";

import CreateBill from "../../components/CreateBill";
import Modal from "../../components/Modal";
import { getGroup } from "../../helper/group";
import { isAuthenticated } from "../../utils/index";

const Skeleton = () => (
  <div className="w-full h-full py-6 px-8 animate-pulse">
    <div className="w-full h-9 bg-gray-200 rounded"></div>
    <div className="w-full h-6 mt-2 mb-3 bg-gray-200 rounded"></div>
    <div className="w-full h-28 mt-2 mb-3 bg-gray-200 rounded"></div>
    {Array(4)
      .fill("")
      .map((_, i) => (
        <div
          key={i}
          className="my-5 first:mt-2 flex justify-start items-center animate-pulse"
        >
          <div className="w-8 h-8 mr-4 rounded-full bg-gray-200" />
          <div className="w-4/5 h-8 rounded-lg bg-gray-200" />
        </div>
      ))}
  </div>
);

const GroupPage = () => {
  const router = useRouter();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBillOpen, setIsBillOpen] = useState(false);

  useEffect(() => {
    const { gid } = router.query;
    const init = async () => {
      setLoading(true);
      try {
        const { token } = isAuthenticated();
        const group = await getGroup(gid, token);
        if (group.error) throw Error(group.reason);
        setGroup(group.data);
      } catch (err) {
        toast.error(err.reason || err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (gid && !isBillOpen) init();
  }, [router, isBillOpen]);

  return (
    <div className="w-sreen h-screen overflow-hidden bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 relative">
      <Toaster />
      <div className="absolute inset-6 bg-white bg-opacity-10 rounded-lg overflow-x-hidden overflow-y-auto">
        {loading ? (
          <Skeleton />
        ) : (
          group && (
            <div className="w-full h-full py-6 px-8 text-white">
              <h1 className="text-3xl ">{group.name}</h1>
              <div className="w-full mt-1 mb-3 flex justify-start items-center flex-wrap">
                {group.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="w-fit mt-1 px-2 py-1 mr-1 text-[0.5rem] text-gray-700 bg-white rounded"
                  >
                    <FaTag className="inline-block" /> {tag}
                  </div>
                ))}
                <div className="w-5 h-5 mt-1 group">
                  <button className="px-2 py-[0.385rem] transition-all hidden group-hover:block text-[0.5rem] text-gray-700 bg-white rounded">
                    <FaPlus />
                  </button>
                </div>
              </div>
              <p className="my-4">{group.description}</p>
              <button
                onClick={() => setIsBillOpen(true)}
                className="mb-4 py-2 px-6 bg-purple-200 text-purple-900 rounded-md text-sm uppercase"
              >
                Split New Bill
              </button>
              <div>
                <span className="text-xs mr-2">Created by: </span>
                <span className="text-lg">
                  {group.creator.name.first} {group.creator.name.last}
                </span>
              </div>
              <div className="mt-4">
                <div className="text-2xl mb-2">
                  <HiOutlineUserGroup className="inline" /> Members:
                </div>
                {group.members.length > 0 &&
                  group.members.map((member) => (
                    <div
                      key={member._id}
                      className="my-3 first:mt-2 flex justify-start items-center"
                    >
                      <div className="w-8 h-8 mr-4 rounded-full bg-fuchsia-800" />
                      <div>
                        <div className="text-lg text-white">
                          {member.name.first} {member.name.last}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-6">
                <div className="text-2xl mb-2">
                  <RiBillLine className="inline" /> Bills:
                </div>
                {group.bills.length > 0 &&
                  group.bills.map((bill) => (
                    <div
                      key={bill._id}
                      className="w-11/12 my-4 px-6 py-4 relative rounded-lg max-w-xs bg-black bg-opacity-50 shadow-lg"
                    >
                      <div className="text-xl text-gray-200">
                        <BsCreditCard className="inline mr-2" />
                        {bill.name}
                      </div>
                      <div className="mt-2 text-sm text-white">
                        <span className="text-2xl mr-2">
                          ₹{bill.totalAmount}
                        </span>
                        <span>
                          on {format(new Date(bill.date), "dd/MM/yyyy")}
                        </span>
                      </div>
                      <div className="mt-2 text-sm">
                        shared at{" "}
                        <span className="text-xl">₹{bill.splitAmount}</span> by{" "}
                        {bill.members.length} members
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )
        )}
      </div>
      {group && (
        <Modal
          isOpen={isBillOpen}
          setIsOpen={setIsBillOpen}
          title="Split New Bill"
          bgPanel="bg-purple-200"
          textColor="text-purple-900"
        >
          <CreateBill
            setIsOpen={setIsBillOpen}
            members={[...group.members, group.creator]}
            groupId={group._id}
          />
        </Modal>
      )}
    </div>
  );
};

export default GroupPage;
