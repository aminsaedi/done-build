import React, { useState } from "react";
import { StyleSheet,Switch,View } from "react-native";
import { useFormikContext } from "formik";
import ErrorMessage from './ErrorMessage';
import AppText from '../modules/AppText';

function AppFormSwitch({ name,value,title, ...otherProps }) {
  const {
    setFieldTouched,
    errors,
    touched,
    setFieldValue,
    values,
  } = useFormikContext();
  const [isEnabled, setIsEnabled] = useState(value);
  const handleChange = () => {
    setFieldValue(name, !isEnabled);
    setIsEnabled((previousState) => !previousState);
  };
  return (
    <View style={styles.container}>
      {title && <AppText style={styles.textArea}>{title}</AppText>}
      <Switch value={isEnabled} onValueChange={handleChange} {...otherProps} />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});

export default AppFormSwitch;