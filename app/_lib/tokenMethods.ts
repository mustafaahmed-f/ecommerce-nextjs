import jwt from "jsonwebtoken";

export const signToken = ({
  payload = {},
  signature = `${process.env.DEFAULT_SIGNATURE}`,
  expiresIn = "1h",
}) => {
  if (!Object.keys(payload).length) {
    throw new Error("payload is required to sign token !", { cause: 400 });
  }
  const token = jwt.sign(payload, signature, { expiresIn });
  return token;
};

export const verifyToken = ({
  token = "",
  signature = `${process.env.DEFAULT_SIGNATURE}`,
} = {}) => {
  if (!token) {
    throw new Error("Token is required to verify !", { cause: 400 });
  }
  const data = jwt.verify(token, signature);
  return data;
};