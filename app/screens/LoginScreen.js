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

    navigation.push("LoginCodeScreen", { token });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Image style={styles.image} source={require("../assets/logo-full.png")} />
      <AppText style={styles.headlineText}>Get Started</AppText>
      <Screen style={styles.container}>
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
    </ScrollView>
  );
}

const validationSchema = Yup.object().shape({
  phone: Yup.string().label("Phone"),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headlineText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
  },
  submitButton: {
    width: "60%",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
});
