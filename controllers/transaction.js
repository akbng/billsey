import { v4 as uuidv4 } from "uuid";

import Transaction from "../models/Transaction";
import { makeObject } from "../utils";

export const getTransactionById = async (trnxId) => {
  try {
    const transaction = await Transaction.findById(trnxId)
      .populate("from", "_id name email")
      .populate("to", "_id name email");
    return transaction;
  } catch (err) {
    throw err;
  }
};

export const getTransactionsOfUser = async (userId) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ from: userId }, { to: userId }],
    })
      .populate("from", "_id name email")
      .populate("to", "_id name email");
    return transactions;
  } catch (err) {
    throw err;
  }
};

export const createTransaction = async ({ amount, from, to, purpose }) => {
  try {
    const transaction = Transaction(
      makeObject({ amount, from, to, purpose, referenceId: uuidv4() })
    );
    const newTrnx = await transaction.save({ validateBeforeSave: true });
    return newTrnx;
  } catch (err) {
    throw err;
  }
};

export const updateTransactionStatus = async ({ trnxId, status }) => {
  try {
    const trnx = await Transaction.findByIdAndUpdate(
      trnxId,
      { status: status },
      { new: true, runValidators: true }
    );
    return trnx;
  } catch (err) {
    throw err;
  }
};
