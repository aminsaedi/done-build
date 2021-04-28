import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../../config/styles";
import AppText from "./AppText";
import Screen from "./Screen";
import Card from "./Card";
import PickerItem from "./PickerItem";
import colors from "../../config/colors";

function AppPicker({
  icon,
  items,
  width = "100%",
  placeholder,
  onSelectItem,
  selectedItem,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <React.Fragment>
      <TouchableWithoutFeedback
        onPress={() => {
          if (selectedItem) onSelectItem(null);
          else setModalVisible(true);
        }}
      >
        <View style={[styles.container, { width: width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.name}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Screen style={{ flex: 1, alignItems: "center" }}>
          <Button title="خروج" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            numColumns={3}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <PickerItem
                style={{ margin: 5 }}
                lable={item.name}
                size={125}
                backgroundColor={colors.medium}
                iconName="account"
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontFamily: "bKoodak",
  },
  placeholder: {
    flex: 1,
    color: defaultStyles.colors.medium,
    fontFamily: "bKoodak",
  },
});

export default AppPicker;
