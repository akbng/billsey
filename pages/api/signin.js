import connectDB from "../../config/database";
import { signin } from "../../controllers/auth";

connectDB();

export default async function (req, res) {
  const { method } = req;
  if (method === "POST") return signin(req, res);
  return res.status(405).json({
    error: true,
    reason: `${method} request is not allowed for this route`,
  });
}
