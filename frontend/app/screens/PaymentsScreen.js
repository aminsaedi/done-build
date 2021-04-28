import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";

import AppButton from "../components/modules/AppButton";
import ActivityIndicator from "../components/modules/ActivityIndicator";
import AppText from "../components/modules/AppText";
import Screen from "../components/modules/Screen";
import useApi from "../hooks/useApi";
import paymentsApi from "../api/payments";
import Card from "../components/modules/Card";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";

function PaymentsScreen(props) {
  const [refreshing, setRefreshing] = useState(false);

  const getPaymentsApi = useApi(paymentsApi.getPayments);
  const deletePaymentApi = useApi(paymentsApi.deletePayment);

  useEffect(() => {
    getPaymentsApi.request();
  }, []);

  const handleDeletePayment = async (payment) => {
    Alert.alert("حذف ایتم", "حذف به مبلغ : " + payment.price, [
      {
        text: "تایید",
        onPress: async () => {
          await deletePaymentApi.request(payment._id);
          getPaymentsApi.request();
        },
      },
      { text: "لغو" },
    ]);
    // await deletePaymentApi.request(payment._id);
  };

  return (
    <>
      <ActivityIndicator
        visible={getPaymentsApi.loading || deletePaymentApi.loading}
        size="large"
      />
      <Screen style={styles.container}>
        {getPaymentsApi.error && (
          <>
            <AppText>Couldn't retrive the listings.</AppText>
            <AppButton title="Retry" onPress={loadListings} />
          </>
        )}
        <FlatList
          style={styles.list}
          data={getPaymentsApi.data}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <Card
              price={item.price}
              receiver={item.receiver.name}
              description={item.description}
              date={item.date}
              isCheque={item.isCheque}
              onLongPress={() => handleDeletePayment(item)}
              // onLongPress={()=>{}}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => getPaymentsApi.request()}
        />
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  list: {
    width: "100%",
  },
});

export default PaymentsScreen;
