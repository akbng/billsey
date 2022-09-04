import connectDB from "../../../config/database";
import { createTransaction } from "../../../controllers/transaction";
import { authenticated } from "../../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { amount, from, to, purpose } = req.body;
    try {
      if (!amount || !from || !to)
        throw Error("Please provide the required fields");
      const trnx = await createTransaction({ amount, from, to, purpose });
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
