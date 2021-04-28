import client from "./client";

const register = (pushToken) => client.post("/expoPushTokens", pushToken);

export default { register };
