import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

import { createGroup } from "../helper/group";
import { isAuthenticated } from "../utils";
import { RiLoader2Line } from "react-icons/ri";

const CreateGroupForm = ({ setIsOpen, friends, setGroups }) => {
  const options = friends.map((friend) => ({
    value: friend._id,
    label: (friend.name.first + " " + friend.name.last).trim(),
  }));

  const [values, setValues] = useState({ name: "", description: "" });
  const [tags, setTags] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (e) =>
    setValues({ ...values, [name]: e.target.value });

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { token } = isAuthenticated();
    try {
      const { name, description } = values;
      const group = await createGroup({
        token,
        name,
        description,
        tags: tags.map((tag) => tag.value),
        members: members.map((member) => member.value),
      });
      console.log(group);
      if (group.error) throw Error(group.reason);
      setGroups((groups) => [...groups, group.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="mt-4">
        <input
          type="text"
          className="w-full py-2 pl-3 pr-8 border focus:outline-none rounded-md bg-gray-50 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 shadow-xl"
          placeholder="Group Name..."
          onChange={handleChange("name")}
          value={values.name}
        />
        <input
          type="text"
          className="w-full py-2 pl-3 pr-8 my-4 border focus:outline-none rounded-md bg-gray-50 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 shadow-xl"
          placeholder="Group Description..."
          onChange={handleChange("description")}
          value={values.description}
        />
        <CreatableSelect
          placeholder="Select Tags..."
          isMulti
          onChange={setTags}
          value={tags}
          options={tags}
        />
        <Select
          placeholder="Select Members..."
          isMulti
          options={options}
          value={members}
          onChange={setMembers}
          className="mt-4"
        />
      </div>
      <div className="mt-4">
        <button
          className="py-1 px-4 rounded-md bg-purple-200 text-purple-800"
          onClick={handleCreateGroup}
          disabled={loading}
        >
          Create{" "}
          {loading && (
            <RiLoader2Line className="ml-2 inline text-lg animate-spin-slow" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateGroupForm;
