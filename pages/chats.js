import BottomNav from "../components/BottomNav";

const Chats = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 relative">
      <div className="w-full h-10">
        <div className="mt-1 h-full flex justify-start items-center">
          <div className="w-8 h-8 mx-6 bg-fuchsia-900 rounded-md"></div>
          <div>
            <h1 className="text-white text-lg">Alan Walker</h1>
            <div className="text-xs text-gray-200">
              <div className="w-2 h-2 mr-1 rounded-full bg-green-600 inline-block" />
              Online
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-4 top-12 bottom-12 overflow-x-hidden overflow-y-auto">
        {/* TODO: Implement later */}
      </div>
      <BottomNav className="fixed inset-0 top-auto h-10 bg-gradient-to-r from-indigo-900 to-purple-900" />
    </div>
  );
};

export default Chats;
