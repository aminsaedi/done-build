import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import MyAccountScreen from "../screens/MyAccountScreen";
import ReportScreen from "../screens/ReportScreen";
import ChequeScreen from "../screens/ChequeScreen";
import ReceiversScreen from '../screens/ReceiversScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.ACCOUNT}
      component={MyAccountScreen}
      options={{ headerShown: false, headerTitle: "حساب کاربری" }}
    />
    <Stack.Screen
      name={routes.REPORTER}
      component={ReportScreen}
      options={{ headerTitle: "گزارش گیر" }}
    />
    <Stack.Screen
      name={routes.CHEQUES}
      component={ChequeScreen}
      options={{ headerTitle: "چک های من" }}
    />
    <Stack.Screen
     name={routes.RECEIVERS}
     component={ReceiversScreen}
    options={{headerTitle:"دریافت کننده ها"}}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
