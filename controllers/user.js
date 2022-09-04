import User from "../models/User";

export const addFriend = async ({ userId, friendId }) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true, runValidators: true }
    );
    return user;
  } catch (err) {
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find().select("_id name email phone");
    return users;
  } catch (err) {
    throw err;
  }
};

export const getFriends = async (userId) => {
  try {
    const friends = await User.findById(userId)
      .select("friends")
      .populate("friends", "_id name email");
    return friends;
  } catch (err) {
    throw err;
  }
};
