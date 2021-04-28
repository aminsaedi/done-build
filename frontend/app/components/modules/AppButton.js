import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import colors from "../../config/colors";

function AppButton({
  title,
  onPress,
  color = colors.primary,
  disabled = false,
  width,
}) {
  return (
    <TouchableOpacity
      style={{
        width: width || "100%",
        padding: "2.5%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: !disabled ? color : colors.medium,
        borderRadius: 30,
        marginVertical: 10,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          fontFamily: "bKoodak",
          textAlign: "center",
          fontSize: 25,
          color: colors.white,
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default AppButton;
