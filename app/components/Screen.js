import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Constants from "expo-constants";

export default function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
    flex: 1,
  },
});
