import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import dayjs from "dayjs";

const prefix = "cache";
const expiryInMinutes = 50;

const isExpired = (item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, "minute") > expiryInMinutes;
};

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem(prefix + key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};
const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    if (!item) return null;

    if (isExpired(item)) {
      remove(key);
      return null;
    }
    return item.value;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(prefix + key);
  } catch (e) {
    // remove error
    console.log(e);
    return false;
  }
  return true;
};

export default {
  store,
  get,
  remove,
};
