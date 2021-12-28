import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../AppText";

export default function AppErrorMessage({ message, visible }) {
  if (!visible) return null;
  return <AppText style={styles.error}>{message}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 14,
  },
});
