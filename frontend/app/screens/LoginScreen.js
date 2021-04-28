import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import AuthContext from "../auth/context";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import ErrorMessage from "../components/forms/ErrorMessage";
import SubmitButton from "../components/forms/SubmitButton";
import Screen from "../components/modules/Screen";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("آدرس ایمیل را وارد کنید")
    .email("آدرس ایمیل معتبر وارد کنید")
    .label("Email"),
  password: Yup.string()
    .required("رمز عبور را وارد کنید")
    .min(4, "حداقل طول رمز ۴ کاراکتر میباشد")
    .label("Password"),
});

function LoginScreen() {
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (result.status !== 200) return setLoginFailed(true);
    setLoginFailed(false);
    logIn(result.data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen style={styles.container}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error="نام کاربری و/یا رمز عبور اشتباه است"
            visible={loginFailed}
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
            placeholder="کلمه عبور"
            secureTextEntry={true}
            textContentType="password"
          />
          <SubmitButton title="ورود" />
        </AppForm>
      </Screen>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
