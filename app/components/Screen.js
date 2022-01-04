import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import Constants from "expo-constants";

import colors from "../config/colors";

export default function Screen({ children, style }) {
  return (
    <ScrollView style={styles.wrapper}>
      <SafeAreaView style={[styles.container, style]}>
        <View style={style}>{children}</View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
  },
  container: {
    padding: Constants.statusBarHeight,
    flex: 1,
  },
});
