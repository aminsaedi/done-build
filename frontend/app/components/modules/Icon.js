import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  name,
  size = 40,
  backgroundColor = "black",
  iconColor = "#fff",
  style
}) {
  return (
    <View
      style={[{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent:"center",
        alignItems:"center"
      },style]}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size / 2} />
    </View>
  );
}


export default Icon;
