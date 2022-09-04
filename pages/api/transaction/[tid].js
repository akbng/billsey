import connectDB from "../../../config/database";
import { getTransactionById } from "../../../controllers/transaction";
import { authenticated } from "../../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { method } = req;
  const { tid } = req.query;
  if (method === "GET") {
    try {
      const trnx = getTransactionById(tid);
      return res.status(200).json({ error: false, data: trnx });
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
