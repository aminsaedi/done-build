import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import Screen from "../components/modules/Screen";
import AppFormSwitch from "../components/forms/AppFormSwitch";
import SubmitButton from "../components/forms/SubmitButton";
import AppFormDatePicker from "../components/forms/AppFormDatePicker";
import useApi from "../hooks/useApi";
import receiversApi from "../api/receivers";
import ActivityIndicator from "../components/modules/ActivityIndicator";
import AppFormPicker from "../components/forms/AppFormPicker";
import AppText from "../components/modules/AppText";
import colors from "../config/colors";
import { color } from "react-native-reanimated";
import paymentsApi from "../api/payments";
import AppFormPriceField from '../components/forms/AppFormPriceField';

const validationSchema = Yup.object().shape({
  price: Yup.number().required("مبلغ را وارد کنید"),
  receiver: Yup.object().required("دریافت کننده را مشخص کنید"),
  date: Yup.date().required("تاریخ را مشخص کنید"),
  description: Yup.string(),
  isCheque: Yup.boolean(),
});

function PaymentsEditingScreen(props) {
  const getReceiversApi = useApi(receiversApi.getReceivers);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    getReceiversApi.request();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setProgress(true);
    const result = await paymentsApi.addPayment(values);
    setProgress(false);
    if (!result.ok) return alert("خطا در ثبت" + result.problem);
    resetForm();
  };
  return (
    <>
      <ActivityIndicator
        visible={getReceiversApi.loading || progress}
        size="large"
      />
      <Screen style={styles.container}>
        <ScrollView automaticallyAdjustContentInsets>
          <AppForm
            initialValues={{
              price: "",
              date: new Date(),
              description: "",
              receiver: "",
              isCheque: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <AppFormPriceField
              name="price"
              keyboardType="numeric"
              width="50%"
              autoCorrect
              maxLength={15}
              placeholder="مبلغ"
            />

            <AppFormPicker
              name="receiver"
              items={getReceiversApi.data}
              placeholder="دریافت کننده"
            />
            <AppFormDatePicker name="date" title="تاریخ پرداخت" />
            <AppFormField
              name="description"
              //   keyboardType="defualt"
              width="100%"
              autoCorrect
              multiline
              numberOfLines={3}
              placeholder="توضیحات"
            />
            <View style={styles.cheque}>
              <AppFormSwitch name="isCheque" value={false} />
              <AppText style={styles.chequeText}>چک؟</AppText>
            </View>
            <SubmitButton title="افزودن" />
          </AppForm>
        </ScrollView>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dateText: {
    fontFamily: "bKoodak",
    textAlign: "center",
    color: colors.medium,
    marginVertical: 10,
  },
  cheque: {
    width: 50,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: "20%",
    marginTop: "2%",
  },
  chequeText: {
    fontFamily: "bKoodak",
    marginTop: "12%",
    paddingLeft: 5,
    marginLeft:10,
    color: colors.medium,
  },
});

export default PaymentsEditingScreen;
