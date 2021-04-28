import React from "react";
import { StyleSheet } from 'react-native';
import { useFormikContext } from "formik";
import Num2persian from "num2persian";

import AppTextInput from "../modules/AppTextInput";
import ErrorMessage from "./ErrorMessage";
import AppText from "../modules/AppText";

function AppFormPriceField({ name, width, ...otherProps }) {
  const {
    setFieldTouched,
    errors,
    touched,
    setFieldValue,
    values,
  } = useFormikContext();
  return (
    <React.Fragment>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => {
          setFieldValue(name, text);
        }}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      {values[name] > 0 && <AppText style={styles.priceLetter}>{Num2persian(values[name])} تومان</AppText>}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
    priceLetter:{
        fontFamily:"bKoodak",
        textAlign:"right"
    }
})

export default AppFormPriceField;
