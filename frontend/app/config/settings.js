import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://amindonebulid.herokuapp.com/api",
  },
  staging: {
    apiUrl: "https://amindonebulid.herokuapp.com/api",
  },
  prod: {
    apiUrl: "https://amindonebulid.herokuapp.com/api",
  },
};

const getCurrentSetting = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSetting();
