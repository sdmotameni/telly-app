import React, { useEffect } from "react";
import { StyleSheet, Alert, View, Linking } from "react-native";

import colors from "../config/colors";
import adminService from "../services/adminService";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Links from "../components/Links";
import Screen from "../components/Screen";
import TopBar from "../components/TopBar";

export default function AdminProfileScreen({ route, navigation }) {
  const item = route.params;

  useEffect(() => {
    navigation.setOptions({ title: item.name });
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete this profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "YES",
          onPress: async () => {
            const response = await adminService.deleteProfile(item.profileId);
            if (!response.ok) return alert(response.data);
            navigation.popToTop();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Screen style={styles.container}>
      <View>
        <View style={styles.itemContainer}>
          <AppText style={styles.keyText}>Date Created</AppText>
          <AppText style={styles.valueText}>{item.dateCreated}</AppText>
        </View>

        <View style={styles.itemContainer}>
          <AppText style={styles.keyText}>Profile ID</AppText>
          <AppText style={styles.valueText}>{item.profileId}</AppText>
        </View>

        <View style={styles.itemContainer}>
          <AppText style={styles.keyText}>Phone</AppText>
          <AppText style={styles.valueText}>{item.phone}</AppText>
        </View>

        <View style={styles.itemContainer}>
          <AppText style={styles.keyText}>is Admin</AppText>
          <AppText style={styles.valueText}>
            {item.isAdmin ? "YES" : "NO"}
          </AppText>
        </View>

        <View style={styles.itemContainer}>
          <AppText style={styles.keyText}>Taps</AppText>
          <AppText style={styles.valueText}>{item.taps}</AppText>
        </View>

        <View style={styles.itemContainer}>
          <AppText style={styles.keyText}>Last Tapped</AppText>
          <AppText style={styles.valueText}>{item.lastTapped}</AppText>
        </View>
      </View>
      <AppButton
        title="Delete Profile"
        style={styles.deleteButton}
        onPress={handleDelete}
      />
      <AppButton
        title="View Profile"
        style={styles.viewProfileButton}
        onPress={() =>
          Linking.openURL("https://app.gettelly.com/" + item.profileId)
        }
      />
      <TopBar content={item} />
      <Links content={item.links} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
  },
  itemContainer: {},
  keyText: {
    fontSize: 18,
    fontWeight: "500",
  },
  valueText: {},
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    marginVertical: 10,
  },
  viewProfileButton: {
    backgroundColor: "#7ecdfa",
    marginBottom: 10,
  },
});
