import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../../config/colors";

function ListItemSeparator() {
  return <View style={styles.seprator} />;
}

const styles = StyleSheet.create({
  seprator: {
    backgroundColor: colors.light,
    width: "100%",
    height: 1,
  },
});

export default ListItemSeparator;
