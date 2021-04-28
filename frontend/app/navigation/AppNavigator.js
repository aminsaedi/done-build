import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Card from "../components/modules/Card";
import routes from "./routes";
import MyAccountScreen from "../screens/MyAccountScreen";
import NewListingButton from "./NewListingButton";
import PaymentsScreen from '../screens/PaymentsScreen';
import PaymentsEditingScreen from '../screens/PaymentsEditingScreen';
import AccountNavigator from './AccountNavigator';


const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={routes.PAYMENTS}
      component={PaymentsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
        tabBarLabel:"خانه",
        
      }}
    />
    <Tab.Screen
      name={routes.PAYMENTS_EDIT}
      component={PaymentsEditingScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton
            onPress={() => navigation.navigate(routes.PAYMENTS_EDIT)}
          />
        ),
      })}
    />
    <Tab.Screen
      name={routes.ACCOUNT}
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
        tabBarLabel:"حساب کاربری"
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
