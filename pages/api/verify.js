import connectDB from "../../config/database";
import { verifyJwt } from "../../lib/jwt";

connectDB();

export default async function (req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const decodedPayload = await verifyJwt(req.query.tok);
      return res.status(200).json({ error: false, data: decodedPayload });
    } catch (error) {
      return res
        .status(401)
        .json({ error: true, reason: error.reason || error.message });
    }
  }
  return res.status(405).json({
    error: true,
    reason: `${method} request is not allowed for this route`,
  });
}
