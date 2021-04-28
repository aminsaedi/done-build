import client from "./client";

const endPoint = "/user";

const register = (name, email, password) => {
  return client.post(endPoint, { name, email, password });
};

export default {
  register,
};
