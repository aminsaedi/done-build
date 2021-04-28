import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  View,
} from "react-native";
import * as Yup from "yup";

import ActivityIndicator from "../components/modules/ActivityIndicator";
import receiversApi from "../api/receivers";
import useApi from "../hooks/useApi";
import paymentsApi from "../api/payments";
import Screen from "../components/modules/Screen";
import ListItem from "../components/lists/ListItem";
import ListItemDelteAction from "../components/lists/ListItemDelteAction";
import AppText from "../components/modules/AppText";
import Icon from "../components/modules/Icon";
import colors from "../config/colors";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import Card from "../components/modules/Card";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("نام دریافت کننده را وارد کنید"),
});

function ReceiversScreen(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [addReceiver, setAddReceiver] = useState(false);
  const [receiverDetail, setReceiverDetail] = useState(false);
  const [selectedReceiver, setSelectedReceiver] = useState({});
  const getReceiversApi = useApi(receiversApi.getFullInfoReceivers);
  const addReceiverApi = useApi(receiversApi.addReceiver);
  const deleteReceiverApi = useApi(receiversApi.deleteReceiver);
  const filterPaymentsApi = useApi(paymentsApi.filterPayments);

  useEffect(() => {
    getReceiversApi.request();
  }, []);

  const handleAddReceiver = (values, { resetForm }) => {
    setAddReceiver(false);
    addReceiverApi.request(values);
    getReceiversApi.request();
    resetForm();
  };

  const handleSelectReceiver = async (receiver) => {
    const result = await filterPaymentsApi.request({ receiver: receiver });
    if (result.data.filtered.length > 0) {
      setSelectedReceiver(result.data);
      setReceiverDetail(true);
    } else alert("موردی برای نمایش وجود ندارد");
  };
  const handleDeleteReceiver = async (receiver) => {
    const result = await deleteReceiverApi.request(receiver._id);
    getReceiversApi.request();
  };
  const priceFormater = (inputPrice) => {
    return inputPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <ActivityIndicator
        visible={
          getReceiversApi.loading ||
          addReceiverApi.loading ||
          filterPaymentsApi.loading
        }
      />
      <Screen style={styles.container}>
        <FlatList
          data={getReceiversApi.data}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subTitle={"مجموع دریافتی :‌ " + priceFormater(item.total)}
              showChevrons
              onPress={async () => await handleSelectReceiver(item)}
              renderRightActions={() => (
                <ListItemDelteAction
                  onPress={() => handleDeleteReceiver(item)}
                />
              )}
            />
          )}
          refreshing={false}
          onRefresh={() => getReceiversApi.request()}
        />
      </Screen>
      <TouchableOpacity
        style={styles.addReceiver}
        onPress={() => setAddReceiver(true)}
      >
        <Icon name="pen" size={70} backgroundColor={colors.secondary} />
      </TouchableOpacity>
      <Modal visible={addReceiver} onRequestClose={() => setAddReceiver(false)}>
        <Screen style={styles.addReceiverModal}>
          <Button title="خروج" onPress={() => setAddReceiver(false)} />
          <AppForm
            initialValues={{ name: "" }}
            validationSchema={validationSchema}
            onSubmit={handleAddReceiver}
          >
            <AppFormField name="name" placeholder="نام دریافت کننده" />
            <SubmitButton title="ثبت" />
          </AppForm>
        </Screen>
      </Modal>
      <Modal
        visible={receiverDetail}
        animationType="slide"
        onRequestClose={() => setReceiverDetail(false)}
      >
        <Screen>
          <Button title="خروج" onPress={() => setReceiverDetail(false)} />
          <FlatList
            data={selectedReceiver.filtered}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <Card
                price={item.price}
                date={item.date}
                description={item.description}
                isCheque={item.isCheque}
                receiver={item.receiver.name}
              />
            )}
          />
          <View style={styles.total}>
            {selectedReceiver.priceSum && (
              <AppText style={styles.totalText}>
                مجموع : {priceFormater(selectedReceiver.priceSum)}
              </AppText>
            )}
          </View>
        </Screen>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
  addReceiver: {
    position: "absolute",
    width: 75,
    height: 75,
    right: 20,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addReceiverModal: {
    padding: 10,
  },
  total: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    // height: "5%",
    marginBottom: "2.5%",
  },
  totalText: {
    textAlign: "right",
    fontFamily: "bKoodak",
    paddingRight: "5%",
    fontSize: 20,
    paddingVertical: 5,
  },
});

export default ReceiversScreen;
