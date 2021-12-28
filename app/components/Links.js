import React from "react";
import { View, ScrollView } from "react-native";

import styles from "../config/styles";

import Link from "./Link";

export default function Links({ content }) {
  return (
    <ScrollView
      contentInset={{ top: 0, left: 0, right: 0, bottom: 200 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {content &&
          Object.keys(content).length !== 0 &&
          Object.keys(content).map((key) => (
            <Link key={key} social={key} handle={content[key]} />
          ))}
      </View>
    </ScrollView>
  );
}
