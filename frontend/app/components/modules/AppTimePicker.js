import React, { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppButton from './AppButton';

function AppTimePicker({pickerTime}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    pickerTime(date);
    hideDatePicker();
  };
  return (
    <View>
      <AppButton title="Show Date Picker" onPress={showDatePicker} />
      {/* <Button /> */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        cancelTextIOS="لغو"
        confirmTextIOS="تایید"
        headerTextIOS="زمان را انتخاب کنید"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});

export default AppTimePicker;
