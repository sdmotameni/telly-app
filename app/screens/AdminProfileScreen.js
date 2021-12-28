import React, { useEffect } from "react";
import { StyleSheet, Alert } from "react-native";

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
      <AppText>Date Created: {item.dateCreated}</AppText>
      <AppText>Profile ID: {item.profileId}</AppText>
      <AppText>Registered Phone: {item.phone}</AppText>
      <AppText>is Admin: {item.isAdmin ? "YES" : "NO"}</AppText>
      <AppButton
        title="Delete Profile"
        style={styles.deleteButton}
        onPress={handleDelete}
      />
      <TopBar content={item} />
      <Links content={item.links} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    marginBottom: 10,
  },
});
