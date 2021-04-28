import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import colors from "../config/colors";
import Screen from "../components/modules/Screen";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/modules/Icon";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import MessagesScreen from "./MessagesScreen";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "چک های من",
    targetScreen: routes.CHEQUES,
    icon: {
      name: "receipt",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "گزارش گیر",
    targetScreen: routes.REPORTER,
    icon: {
      name: "export",
      backgroundColor: colors.secondary,
    },
  },
  {
    title:"دریافت کننده ها",
    targetScreen: routes.RECEIVERS,
    icon:{
      name:"call-received",
      backgroundColor : "#fd9644"
    }
    
  }
];

function MyAccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  return (
    <Screen>
      <ListItem
        style={styles.info}
        title={user.name}
        subTitle={user.email}
        image={require("../assets/mosh.jpg")}
      />
      <View style={styles.optionsPartOne}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigation.navigate(item.targetScreen)}
              title={item.title}
              ImageComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
      <View style={styles.optionsPartOne}>
        <ListItem
          style={styles.option}
          title="خروج از حساب"
          ImageComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => logOut()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  info: {
    marginTop: 50,
  },
  optionsPartOne: {
    marginTop: 50,
  },
  option: {
    marginTop: 1,
  },
});

export default MyAccountScreen;
