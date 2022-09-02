import { resolve } from "path";

import generateRsaKeyPair from "../../lib/generateRsaKeyPair";

// TODO: Restrict this route to only the admin
export default function handler(req, res) {
  const root = process.env.ROOT;
  generateRsaKeyPair(resolve(root, "private.pem"), resolve(root, "public.pem"));
  res.status(200).send("Success");
}
