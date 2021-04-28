import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppIconPicker from "./AppIconPicker";
import AppText from "./AppText";
import colors from "../../config/colors";

function PickerItem({ lable,iconName,backgroundColor,size, onPress,style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* <AppText style={styles.text} >{lable}</AppText> */}
      <AppIconPicker
        style={style}
        size={size}
        backgroundColor={backgroundColor}
        iconName={iconName}
        lable={lable}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
