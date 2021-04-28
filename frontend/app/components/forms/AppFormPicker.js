import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../modules/AppTextInput";
import ErrorMessage from "./ErrorMessage";
import AppPicker from "../modules/AppPicker";

function AppFormPicker({
  icon,
  width,
  items,
  placeholder,
  name,
  ...otherProps
}) {
  const {
    setFieldValue,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();
  return (
    <React.Fragment>
      <AppPicker
        width={width}
        icon={icon}
        placeholder={placeholder}
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}

export default AppFormPicker;
