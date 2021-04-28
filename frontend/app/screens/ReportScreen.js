import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Vibration,
  Button,
} from "react-native";
import * as Yup from "yup";

import ActivityIndicator from "../components/modules/ActivityIndicator";
import receiversApi from "../api/receivers";
import Screen from "../components/modules/Screen";
import paymentsApi from "../api/payments";
import useApi from "../hooks/useApi";
import AppForm from "../components/forms/AppForm";
import AppFormPicker from "../components/forms/AppFormPicker";
import AppFormDatePicker from "../components/forms/AppFormDatePicker";
import SubmitButton from "../components/forms/SubmitButton";
import AppText from "../components/modules/AppText";
import Card from "../components/modules/Card";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  from: Yup.date().required(),
  to: Yup.date().required(),
  receiver: Yup.object().nullable(),
});

function ReportScreen(props) {
  const filterPaymentsApi = useApi(paymentsApi.filterPayments);
  const getReceiversApi = useApi(receiversApi.getReceivers);
  const [modalResult, setModalResult] = useState(false);
  const [progress, setProgress] = useState(false);
  const [priceSum, setPriceSum] = useState(0);
  const [report, setReport] = useState();
  const currentDate = new Date();
  useEffect(() => {
    getReceiversApi.request();
  }, []);
  const handleSubmit = async (values) => {
    // console.log(values);
    setProgress(true);
    const result = await filterPaymentsApi.request(values);
    // console.log(result.data);
    if (result.data.filtered.length === 0) {
      setProgress(false);
      return Vibration.vibrate(1);
    }
    setPriceSum(result.data.priceSum);
    setReport(result.data.filtered);
    setModalResult(true);
    setProgress(false);
  };
  const priceFormater = (inputPrice) => {
    return inputPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <ActivityIndicator
        visible={
          filterPaymentsApi.loading || getReceiversApi.loading || progress
        }
        size="large"
      />
      <Screen style={styles.container}>
        <ScrollView>
          <AppForm
            initialValues={{
              from: new Date(),
              to: new Date(),
              receiver: "",
            }}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <AppFormPicker
              name="receiver"
              items={getReceiversApi.data}
              placeholder="دریافت کننده"
            />
            <AppFormDatePicker
              name="from"
              title="تاریخ شروع فیلتر"
              height={400}
              mode="start"
            />
            <AppFormDatePicker name="to" title="تاریخ پایان فیلتر" mode="end" />
            <SubmitButton title="جستجو" />
          </AppForm>
        </ScrollView>
        <Modal
          visible={modalResult}
          animationType="slide"
          onRequestClose={() => setModalResult(false)}
        >
          <Screen>
            <Button title="خروج" onPress={() => setModalResult(false)} />
            <FlatList
              data={report}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Card
                  price={item.price}
                  receiver={item.receiver.name}
                  date={item.date}
                  description={item.description}
                  isCheque={item.isCheque}
                />
              )}
            />
            <View style={styles.priceSum}>
              {priceSum && <AppText style={styles.priceText}>
                مجموع قیمت گزارش :‌{priceFormater(priceSum)}
              </AppText>}
            </View>
          </Screen>
        </Modal>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  priceSum: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    // height: "5%",
    marginBottom: "2.5%",
  },
  priceText: {
    textAlign: "right",
    fontFamily: "bKoodak",
    paddingRight: "5%",
    fontSize: 20,
    paddingVertical: 5,
  },
});

export default ReportScreen;
