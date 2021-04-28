import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "@use-expo/font";

import AuthContext from "./app/auth/context";
import AuthNavigator from "./app/navigation/AuthNavigator";
import authStorage from "./app/auth/storage";
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import OfflineNotice from './app/components/modules/OfflineNotice';

const customFonts = {
  bKoodak: require("./app/assets/fonts/bKoodak.ttf"),
};


export default function App() {

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isLoaded] = useFonts(customFonts);
  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };
  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={() => console.log("Error loading app")}
      />
    );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}