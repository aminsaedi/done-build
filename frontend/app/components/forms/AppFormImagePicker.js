import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../modules/AppTextInput";
import ErrorMessage from "./ErrorMessage";
import AppPicker from "../modules/AppPicker";
import ImageInputList from "../lists/ImageInputList";

function AppFormImagePicker({
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
  const imageUris = values[name];
  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <React.Fragment>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}

export default AppFormImagePicker;
