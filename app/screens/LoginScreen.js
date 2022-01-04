import React, { useState } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import * as Yup from "yup";

import authService from "../services/authService";
import getFormattedNumb from "../utils/getFormattedNumb";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  AppSubmitButton,
  AppErrorMessage,
} from "../components/forms";
import AppText from "../components/AppText";

export default function LoginScreen({ navigation }) {
  const [error, setError] = useState(null);

  const handleSubmit = async (obj) => {
    const phone = getFormattedNumb(obj.phone);

    const response = await authService.login(phone);
    if (!response.ok) return setError(response.data);

    const token = response.headers["token-to-match"];
    if (!token) return setError("No token found. Try again.");

    navigation.push("LoginCodeScreen", { token, phone });
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo-full.png")} />
      <AppText style={styles.headlineText}>Get Started</AppText>
      <AppForm
        initialValues={{ phone: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppErrorMessage message={error} visible={error} />
        <AppFormField
          name="phone"
          icon="phone"
          placeholder="Phone Number"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
        />
        <AppSubmitButton style={styles.submitButton} title="Login" />
      </AppForm>
    </Screen>
  );
}

const validationSchema = Yup.object().shape({
  phone: Yup.string().label("Phone"),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
  },
  headlineText: {
    fontSize: 32,
    fontWeight: "700",
  },
  submitButton: {
    marginTop: 10,
    width: "80%",
  },
});
