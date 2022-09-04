import Group from "../models/Group";
import { makeObject } from "../utils";

export const getMemberGroups = async (userId) => {
  try {
    const groups = await Group.find({
      $or: [{ creator: userId }, { members: userId }],
    });
    return groups;
  } catch (err) {
    throw err;
  }
};

export const getGroupById = async (groupId) => {
  try {
    const group = await Group.findById(groupId)
      .populate("creator", "_id name email")
      .populate("members", "_id name email")
      .populate("transactions");
    return group;
  } catch (err) {
    throw err;
  }
};

export const createGroup = async ({
  name,
  description,
  tags,
  creator,
  members,
}) => {
  try {
    const group = Group(
      makeObject({ name, description, tags, creator, members })
    );
    const newGroup = await group.save({ validateBeforeSave: true });
    return newGroup;
  } catch (err) {
    throw err;
  }
};

export const addTagToGroup = async ({ groupId, tag }) => {
  try {
    const group = await Group.findByIdAndUpdate(
      groupId,
      { $push: { tags: tag } },
      { new: true, runValidators: true }
    );
    return group;
  } catch (err) {
    throw err;
  }
};

export const addMembersToGroup = async ({ groupId, members }) => {
  try {
    const group = await Group.findByIdAndUpdate(
      groupId,
      { $push: { members: { $each: [...members] } } },
      { new: true, runValidators: true }
    );
    return group;
  } catch (err) {
    throw err;
  }
};

export const addTransactionToGroup = async ({ groupId, transaction }) => {
  try {
    const group = await Group.findByIdAndUpdate(
      groupId,
      { $push: { transactions: transaction } },
      { new: true, runValidators: true }
    );
    return group;
  } catch (err) {
    throw err;
  }
};

export const addBillToGroup = async ({ groupId, bill }) => {
  try {
    const group = await Group.findByIdAndUpdate(
      groupId,
      { $push: { bills: bill } },
      { new: true, runValidators: true }
    );
    return group;
  } catch (err) {
    throw err;
  }
};

export const removeGroupById = async (groupId) => {
  try {
    await Group.findByIdAndRemove(groupId);
    return true;
  } catch (err) {
    throw err;
  }
};
