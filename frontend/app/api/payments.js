import client from "./client";

const endpoint = "/payments";

const getPayments = () => client.get(endpoint);

const addPayment = (input) => client.post(endpoint, input);

const filterPayments = (input) => client.post(endpoint + "/filter", input);

const cheques = () => client.get(endpoint + "/cheques");

const deletePayment = (id) => client.delete(endpoint + "/" + id);

export default {
  getPayments,
  addPayment,
  filterPayments,
  cheques,
  deletePayment,
};
