import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import getMetaDetails from "../utils/getMetaDetails";

import AppText from "./AppText";

export default function Link({ social, handle }) {
  const data = getMetaDetails(social, handle);
  if (!data) return null;

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Linking.openURL(data.url)}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: data.image }} />
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{data.title}</AppText>
            <AppText style={styles.subTitle}>{handle}</AppText>
          </View>
          <MaterialCommunityIcons
            name="arrow-right"
            size={25}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 75,
    padding: 10,
    backgroundColor: colors.white,
    marginBottom: 6,
    borderRadius: 10,
  },
  image: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  detailsContainer: { flex: 1 },
  title: {
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 15,
  },
});
