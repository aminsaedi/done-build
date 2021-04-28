import client from "./client";

const endPoint = "/receivers";

const getReceivers = () => client.get(endPoint);

const addReceiver = (info) => client.post(endPoint, info);

const getFullInfoReceivers = () => client.get(endPoint + "/withTotal");

const deleteReceiver = (id) => client.delete(endPoint + "/" + id);

export default {
  getReceivers,
  addReceiver,
  getFullInfoReceivers,
  deleteReceiver,
};
