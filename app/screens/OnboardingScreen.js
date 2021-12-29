import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";

import userService from "../services/userService";
import handleNfc from "../utils/handleNfc";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";

export default function OnboardingScreen({ setIsNew }) {
  const [name, setName] = useState("");

  const onChangeText = (text) => {
    setName(text);
  };

  const handleSubmit = async () => {
    const response = await userService.updateSettings({ name });
    if (!response.ok) return;

    const response2 = await userService.getMe();
    if (!response2.ok) return;

    handleNfc(response2.data.profileId, async () => {
      await userService.setIsNew();
      setIsNew(false);
    });
  };

  return (
    <Screen style={[styles.wrapper, { padding: 10 }]}>
      <Image style={styles.image} source={require("../assets/logo-full.png")} />
      <AppText style={styles.headlineText}>
        Let's get your account up and running...
      </AppText>
      <AppText style={styles.nameLabel}>What's your name?</AppText>
      <AppTextInput
        icon="account"
        placeholder="John Doe"
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        textContentType="name"
      />
      <AppButton title="Activate Telly" onPress={handleSubmit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headlineText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  nameLabel: {
    fontSize: 16,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
