import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.WELLCOME}
      component={WelcomeScreen}
      options={{ headerShown: false,headerTitle:"خوش آمدید" }}
    />
    <Stack.Screen
      name={routes.LOGIN}
      component={LoginScreen}
      options={{ headerTitle: "ورود به حساب" }}
    />
    <Stack.Screen
      name={routes.REGISTER}
      component={RegisterScreen}
      options={{ headerTitle: "ساخت حساب جدید" }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
