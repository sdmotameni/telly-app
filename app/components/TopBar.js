import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";

import colors from "../config/colors";

import AppText from "./AppText";

export default function TopBar({ content }) {
  return (
    <View style={styles.container}>
      <View style={styles.startContainer}>
        <Image
          source={{ uri: content.photoUrl }}
          style={styles.image}
          tint="light"
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.name}>{content.name}</AppText>
          <AppText style={styles.bio}>{content.bio}</AppText>
        </View>
      </View>
      {content.website && (
        <TouchableWithoutFeedback
          onPress={() => Linking.openURL("https://" + content.website)}
        >
          <View style={styles.websiteContainer}>
            <Image
              source={require("../assets/website.png")}
              style={styles.websiteImg}
              tint="light"
            />
            <AppText style={styles.website}>{content.website}</AppText>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    borderColor: colors.light,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 6,
    marginBottom: 10,
  },
  startContainer: { width: "100%", alignItems: "center" },
  detailsContainer: {
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    marginRight: 15,
  },
  bio: {
    fontSize: 15,
    marginBottom: 9,
  },
  websiteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  website: {
    fontSize: 14,
  },
  websiteImg: {
    height: 15,
    width: 15,
    marginRight: 7,
  },
});
