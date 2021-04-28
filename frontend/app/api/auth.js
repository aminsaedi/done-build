import client from "./client";

const endPoint = "/auth";

const login = (email, password) => {
  const result = client.post(endPoint, { email, password });
  return result;
};

export default {
  login,
};
