import { useState, useEffect } from "react";

import {
  findStateFromCode,
  findStateFromPin,
  states,
} from "../data/IndianStates";
import SelectList from "./SelectList";

const AddressTab = ({ values, handleChange }) => {
  const [selectedState, setSelectedState] = useState(
    findStateFromCode(values.state) || states[0]
  );

  useEffect(() => {
    const ob = { target: { value: selectedState.code } };
    handleChange("state")(ob);
  }, [selectedState]);

  const handlePinCode = (e) => {
    const pin = e.target.value;
    const foundState = findStateFromPin(pin);
    if (foundState) setSelectedState(foundState);
    handleChange("pincode")(e);
  };

  return (
    <div>
      <h1 className="text-2xl mb-6 text-purple-50">Fill Your Address</h1>
      <input
        type="text"
        className="w-full my-2 py-2 px-3 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
        placeholder="Address Line..."
        value={values.addressLine}
        onChange={handleChange("addressLine")}
      />
      <input
        type="text"
        className="w-full my-2 py-2 px-3 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
        placeholder="Landmark (If any)..."
        value={values.landmark}
        onChange={handleChange("landmark")}
      />
      <div className="w-full flex">
        <input
          type="text"
          className="w-1/3 my-2 py-2 px-3 border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
          placeholder="City..."
          value={values.city}
          onChange={handleChange("city")}
        />
        <input
          type="text"
          className="w-2/3 ml-2 my-2 py-2 px-3 text-lg border focus:outline-none rounded-md bg-purple-50 text-gray-800 shadow-xl"
          placeholder="Pin Code..."
          value={values.pincode}
          onChange={handlePinCode}
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
