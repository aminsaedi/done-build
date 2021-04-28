import React from "react";
import { View, StyleSheet } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import Constants from "expo-constants";

import AppText from "./AppText";
import colors from "../../config/colors";

function OfflineNotice(props) {
  const netInfo = useNetInfo();
  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>عدم دسترسی به اینترنت</AppText>
      </View>
    );
  return null;
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    zIndex: 1,
    backgroundColor: colors.primary,
    width: "100%",
  },
  text: {
    color: colors.white,
    fontFamily:"bKoodak",
    textAlign:"center"
  },
});

export default OfflineNotice;
