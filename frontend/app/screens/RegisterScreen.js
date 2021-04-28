import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import ActivityIndicator from "../components/modules/ActivityIndicator";
import Screen from "../components/modules/Screen";
import colors from "../config/colors";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import userApi from "../api/user";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("اسم اجباری است")
    .min(4, "حداقل طول ۴ کاراکتر می باشد"),
  email: Yup.string()
    .email("ادرس ایمیل معتبر نیست")
    .required("ایمیل اجباری است"),
  password: Yup.string()
    .required("رمز عبور اجباری است")
    .min(4, "حداقل طول ۴ کاراکنر است"),
});

function RegisterScreen(props) {
  const { logIn } = useAuth();
  const [registerFailed, setRegisterFailed] = useState(false);
  const handleSubmit = async (userInfo) => {
    const result = await userApi.register(
      userInfo.name,
      userInfo.email,
      userInfo.password
    );
    if (result.status !== 200) return setRegisterFailed(true);
    setRegisterFailed(false);
    logIn(result.headers["x-auth-token"]);
  };

  return (
    <>
      {/* <ActivityIndicator visible={false} /> */}
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="words"
            autoCompleteType="name"
            autoCorrect={false}
            keyboardType="default"
            name="name"
            icon="account"
            placeholder="اسم"
            textContentType="name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            icon="email"
            placeholder="ایمیل"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="رمز عبور"
            secureTextEntry={true}
            textContentType="password"
          />
          <SubmitButton title="ثبت نام" />
        </AppForm>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    color: colors.white,
    padding: 10,
  },
});

export default RegisterScreen;
