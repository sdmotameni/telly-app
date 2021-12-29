import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import * as Yup from "yup";

import useAuth from "../auth/useAuth";
import authService from "../services/authService";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import {
  AppForm,
  AppFormField,
  AppSubmitButton,
  AppErrorMessage,
} from "../components/forms";

export default function LoginCodeScreen({ route, navigation }) {
  const [error, setError] = useState(null);
  const auth = useAuth();
  const { token } = route.params;

  const handleSubmit = async (obj) => {
    const { loginCode } = obj;

    const response = await authService.validateToken(token, loginCode);
    if (!response.ok) return setError(response.data);

    const authToken = response.headers["x-auth-token"];
    auth.login(authToken);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Image style={styles.image} source={require("../assets/logo-full.png")} />
      <AppText style={styles.headlineText}>Get Started</AppText>
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ loginCode: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppErrorMessage message={error} visible={error} />
          <AppFormField
            name="loginCode"
            icon="code-greater-than"
            placeholder="Enter the code"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="phone-pad"
            textContentType="oneTimeCode"
          />
          <AppSubmitButton style={styles.submitButton} title="Login" />
        </AppForm>
      </Screen>
    </ScrollView>
  );
}

const validationSchema = Yup.object().shape({
  token: Yup.string().label("Token"),
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
