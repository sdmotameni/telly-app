import React from "react";
import { StyleSheet, TextInput, View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

export default function AppTextInput({ icon, imageUri, style, ...rest }) {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <MaterialCommunityIcons
          style={styles.icon}
          name={icon}
          size={20}
          color={colors.medium}
        />
      )}
      {imageUri && <Image style={styles.image} source={{ uri: imageUri }} />}
      <TextInput
        placeholderTextColor={colors.medium}
        autoCapitalize="none"
        style={defaultStyles.text}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
