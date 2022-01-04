import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Linking,
  Image,
} from "react-native";
import colors from "../config/colors";

import AppText from "./AppText";

export default function WebsiteBar({ website }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => Linking.openURL("https://" + website)}
      >
        <View style={styles.websiteContainer}>
          <Image
            source={require("../assets/website.png")}
            style={styles.websiteImg}
            tint="light"
          />
          <AppText style={styles.website}>{website}</AppText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
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
