import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
var jalaali = require("jalaali-js");

import colors from "../../config/colors";
import AppText from "./AppText";

function Card({
  price = "100",
  receiver = "کاربر",
  description,
  onPress,
  style,
  isCheque,
  date,
  onLongPress,
}) {
  const window = useWindowDimensions();
  const formatedDate = new Date(date);
  const jalaliDate = jalaali.toJalaali(formatedDate);
  const jalaliString =
    jalaliDate.jy + "/" + jalaliDate.jm + "/" + jalaliDate.jd;
  const timeString = formatedDate.getHours() + ":" + formatedDate.getMinutes();
  const priceFormater = (inputPrice) => {
    return inputPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View
        style={[
          styles.cardConatiner,
          style,
          {
            backgroundColor: isCheque ? colors.medium : colors.light,
            // height: window.height / 4,
          },
        ]}
      >
        <AppText style={styles.price}>{priceFormater(price)} تومان</AppText>
        <AppText style={styles.receiver}>دریافت کننده : {receiver}</AppText>
        <AppText style={styles.date}>تاریخ ثبت : {jalaliString}</AppText>
        <AppText style={styles.time}>زمان ثبت : {timeString}</AppText>
        <AppText style={styles.description} numberOfLines={2}>
          {description ? "توضیحات :‌" + description : ""}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardConatiner: {
    // flex: 1,
    width: "95%",
    marginLeft: "2.5%",
    backgroundColor: colors.light,
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  price: {
    fontFamily: "bKoodak",
    marginTop: 10,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "400",
  },
  receiver: {
    color: colors.secondary,
    fontFamily: "bKoodak",
    fontSize: 17,
    fontWeight: "bold",
    paddingTop: 5,
    paddingRight: 20,
    textAlign: "right",
  },
  description: {
    color: colors.dark,
    textAlign: "right",
    marginTop: 5,
    paddingRight: 20,
    fontWeight: "300",
    fontFamily: "bKoodak",
  },
  date: {
    color: colors.dark,
    textAlign: "right",
    paddingRight: 20,
    marginTop: 5,
    fontFamily: "bKoodak",
  },
  time: {
    textAlign: "right",
    paddingRight: 20,
    marginTop: 5,
    color: colors.dark,
    fontFamily: "bKoodak",
  },
});

export default Card;
