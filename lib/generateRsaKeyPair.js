import { generateKeyPairSync } from "crypto";
import { writeFileSync } from "fs";

const generateRsaKeyPair = (pathToPrivateKey, pathToPublicKey) => {
  const keyPair = generateKeyPairSync("rsa", {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
  });

  writeFileSync(pathToPublicKey, keyPair.publicKey);
  writeFileSync(pathToPrivateKey, keyPair.privateKey);
};

export default generateRsaKeyPair;
