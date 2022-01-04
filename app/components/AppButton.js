import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";

import AppText from "./AppText";

export default function AppButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: colors.white,
    fontWeight: "500",
  },
});
