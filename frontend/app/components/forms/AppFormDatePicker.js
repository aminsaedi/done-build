import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PersianCalendarPicker from "react-native-persian-calendar-picker";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import AppText from "../modules/AppText";
import colors from "../../config/colors";

function AppFormDatePicker({
  name,
  title = "تاریخ",
  width = "85%",
  height = 330,
  mode = "now",
  ...otherProps
}) {
  const {
    setFieldTouched,
    errors,
    touched,
    setFieldValue,
    values,
  } = useFormikContext();
  const formatDate = (inputDate) => {
    if (mode === "now") {
      setFieldValue(name, new Date(inputDate));
    }
    if (mode === "end") {
      let end = new Date(inputDate);
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(59);
      end.setMilliseconds(999);
      setFieldValue(name, end);
    }
    if (mode === "start") {
      let start = new Date(inputDate);
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);
      start.setMilliseconds(0);
      setFieldValue(name, start);
    }
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <AppText style={styles.title}>{title}</AppText>
      {/* <DatePiker pickerDate={formatDate} /> */}
      <PersianCalendarPicker
        onDateChange={formatDate}
        isRTL
        selectedDayColor={colors.primary}
        textStyle={{ fontFamily: "bKoodak" }}
        scaleFactor={440}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    overflow: "scroll",
  },
  title: {
    fontFamily: "bKoodak",
    textAlign: "center",
    color: colors.medium,
    // marginTop : "10%",
    paddingBottom: "2%",
  },
});
export default AppFormDatePicker;
