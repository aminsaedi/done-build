import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
const key = "authToken";
const storeToken = async (authtoken) => {
  try {
    await SecureStore.setItemAsync(key, authtoken);
  } catch (error) {
    console.log("Error storing the auth token ", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing auth token", error);
  }
};

export default { getToken, storeToken, getUser, removeToken };
