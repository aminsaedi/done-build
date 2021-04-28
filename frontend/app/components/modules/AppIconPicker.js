import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../../config/colors";
function AppIconPicker({ size, iconName, backgroundColor, lable,style }) {
  return (
    <View
      style={[{
        width: size,
        height: size,
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
      },style]}
    >
      <Icon
        name={iconName}
        iconColor={colors.white}
        backgroundColor={backgroundColor}
        size={size / 1.7}
      />
      <AppText style={{textAlign:"center"}}>{lable}</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default AppIconPicker;
