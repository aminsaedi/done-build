import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../../config/colors";
import AppText from "../modules/AppText";
import Icon from "../modules/Icon";

function ListItem({
  title,
  subTitle,
  image,
  ImageComponent,
  onPress,
  renderRightActions,
  style,
  showChevrons,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, style]}>
          {ImageComponent}
          {image && <Image source={image} style={styles.image} />}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>
          {showChevrons && (
            <View style={styles.icon}>
              <Icon
                name="chevron-right"
                iconColor={colors.medium}
                backgroundColor={colors.white}
                size={50}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  detailsContainer: {
    flex : 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
    fontFamily:"bKoodak",
    paddingTop:3
  },
  subTitle: {
    color: colors.medium,
    fontFamily:"bKoodak",
    marginTop:5
  },
  icon: {
    
  },
});
export default ListItem;
