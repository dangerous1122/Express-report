import  jwt  from "jsonwebtoken";
export const tokenGenerator = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
  return token;
};
