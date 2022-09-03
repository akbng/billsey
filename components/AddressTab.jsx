import { useState } from "react";

import { states } from "../data/IndianStates";
import SelectList from "./SelectList";

const AddressTab = () => {
  const [selectedState, setSelectedState] = useState(states[0]);
  return (
    <div>
      <h1 className="text-2xl mb-6 text-purple-50">Fill Your Address</h1>
      <input
        type="text"
        className="w-full my-2 py-2 px-3 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
        placeholder="Address Line..."
      />
      <input
        type="text"
        className="w-full my-2 py-2 px-3 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
        placeholder="Landmark (If any)..."
      />
      <div className="w-full flex">
        <input
          type="text"
          className="w-1/3 my-2 py-2 px-3 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
          placeholder="City..."
        />
        <input
          type="text"
          className="w-2/3 ml-2 my-2 py-2 px-3 text-lg border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
          placeholder="Pin Code..."
        />
      </div>
      <div className="relative w-full">
        <SelectList
          selected={selectedState}
          setSelected={setSelectedState}
          data={states}
        />
      </div>
    </div>
  );
};

export default AddressTab;
