import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ListItem from "../components/lists/ListItem";
import Screen from "../components/modules/Screen";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDelteAction from "../components/lists/ListItemDelteAction";

const initialMessages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "descriptionTwo",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 3,
    title: "T2",
    description: "D3",
    image: require("../assets/mosh.jpg"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("message selected", item.id)}
            showChevrons
            renderRightActions={() => (
              <ListItemDelteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={()=>{
            setMessages(initialMessages)
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default MessagesScreen;
