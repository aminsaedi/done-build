import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DatePicker from "@mohamadkh75/react-native-jalali-datepicker";

import colors from "../../config/colors";

function DatePiker({ style, pickerDate }) {
  return (
    <View>
      <DatePicker
        style={{
          width: "100%",
          height: "100%",
          alignSelf: "center",
          backgroundColor: colors.light,
          borderWidth: 1,
          borderColor: colors.secondary,
          borderRadius: 10,
          elevation: 4,
        }}
        selected={"1399/0/0"}
        dateSeparator="/"
        minDate="1397/10/10"
        maxDate="1410/10/18"
        headerContainerStyle={{ height: "15%" }}
        yearMonthBoxStyle={{
          width: "30%",
          height: "75%",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 10,
        }}
        yearMonthTextStyle={{ fontSize: 22, color: colors.secondary }}
        iconContainerStyle={{ width: `${100 / 7}%` }}
        backIconStyle={{
          width: 20,
          height: 20,
          resizeMode: "center",
          tintColor: colors.medium,
        }}
        nextIconStyle={{
          width: 20,
          height: 20,
          resizeMode: "center",
          tintColor: colors.secondary,
        }}
        eachYearStyle={{
          width: "30%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.secondary,
          marginTop: "1.5%",
          marginBottom: 5,
          marginHorizontal: "1.5%",
          borderRadius: 10,
          elevation: 3,
        }}
        eachYearTextStyle={{
          fontSize: 16,
          color: "white",
        }}
        eachMonthStyle={{
          width: `${88 / 3}%`,
          height: `${88 / 4}%`,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.secondary,
          marginBottom: "3%",
          borderRadius: 10,
          elevation: 3,
        }}
        eachMonthTextStyle={{ fontSize: 16, color: "white" }}
        weekdaysContainerStyle={{ height: "10%" }}
        weekdayStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        weekdayTextStyle={{
          fontSize: 16,
          color: colors.medium,
          marginBottom: 5,
        }}
        borderColor={colors.secondary}
        dayStyle={{
          width: `${100 / 7}%`,
          justifyContent: "center",
          alignItems: "center",
          aspectRatio: 1 / 1,
        }}
        selectedDayStyle={{
          width: "70%",
          aspectRatio: 1 / 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
        }}
        selectedDayColor={colors.secondary}
        dayTextStyle={{ fontSize: 18 }}
        selectedDayTextColor="white"
        dayTextColor={colors.secondary}
        disabledTextColor={colors.medium}
        onDateChange={pickerDate}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "40%",
    width: "75%",
    marginLeft: "2.5%",
    // flex:1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "red",
  },
});

export default DatePiker;
