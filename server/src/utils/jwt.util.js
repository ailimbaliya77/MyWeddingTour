import jwt from "jsonwebtoken";

export const generateToken = (user, secret, expiresIn) => {
  return jwt.sign({ id: user._id }, secret, {
    expiresIn: expiresIn,
  });
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
