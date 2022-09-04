import connectDB from "../../../config/database";
import { getTransactionsOfUser } from "../../../controllers/transaction";
import { authenticated } from "../../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { query, method } = req;
  const { uid } = query;
  if (method === "GET") {
    try {
      if (!req.user._id.equals(uid)) throw Error("Wrong user and token");
      const transactions = await getTransactionsOfUser(uid);
      return res.status(200).json({ error: false, data: transactions });
    } catch (err) {
      return res
        .status(400)
        .json({ error: true, reason: err.reason || err.message });
    }
  }
  return res.status(405).json({
    error: true,
    reason: `${method} request is not allowed for this route`,
  });
});
