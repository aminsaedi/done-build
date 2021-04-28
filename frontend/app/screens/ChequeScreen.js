import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import AppButton from "../components/modules/AppButton";
import ActivityIndicator from "../components/modules/ActivityIndicator";
import paymentsApi from "../api/payments";
import useApi from "../hooks/useApi";
import Screen from "../components/modules/Screen";
import Card from "../components/modules/Card";

function ChequeScreen(props) {
  const getChequeApi = useApi(paymentsApi.cheques);
  useEffect(() => {
    getChequeApi.request();
  }, []);
  return (
    <>
      <ActivityIndicator visible={getChequeApi.loading} size="large" />
      <Screen style={styles.container} >
        {getChequeApi.error && (
          <>
            <AppText>خطا در ارتباط با سرور</AppText>
            <AppButton
              title="تلاش مجدد"
              onPress={() => getChequeApi.request()}
            />
          </>
        )}
        <FlatList
          data={getChequeApi.data}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <Card
              price={item.price}
              receiver={item.receiver.name}
              description={item.description}
              isCheque={item.isCheque}
              date={item.date}
            />
          )}
          refreshing={false}
          onRefresh={() => getChequeApi.request()}
        />
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop:"2%"
  },
});

export default ChequeScreen;
