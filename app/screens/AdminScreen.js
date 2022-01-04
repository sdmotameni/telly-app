import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import filter from "lodash.filter";

import colors from "../config/colors";
import handleAlert from "../utils/handleAlert";
import adminService from "../services/adminService";

import AppText from "../components/AppText";

export default function AdminScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [fullUsers, setFullUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllUsers();
    });
    return unsubscribe;
  }, [navigation]);

  const getAllUsers = async () => {
    const response = await adminService.getAllUsers();
    if (!response.ok) return handleAlert("Something went wrong. Try again.");
    setUsers(response.data);
    setFullUsers(response.data);
  };

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = filter(fullUsers, (user) => {
      return contains(user, formattedQuery);
    });

    setUsers(data);
  };

  const contains = ({ name, phone }, query) => {
    if (name) {
      const formattedName = name.toLowerCase();
      if (formattedName.includes(query) || phone.includes(query)) {
        return true;
      }
    } else {
      const formattedName = "null";
      if (formattedName.includes(query) || phone.includes(query)) {
        return true;
      }
    }

    return false;
  };

  const renderHeader = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          autoCapitalize="none"
          clearButtonMode="always"
          autoCorrect={false}
          onChangeText={handleSearch}
          status="info"
          placeholder="Search by name or phone number"
          textStyle={{ color: "#000" }}
        />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.push("AdminProfileScreen", item)}
      >
        <View style={styles.itemContainer}>
          <Image style={styles.profileImage} source={{ uri: item.photoUrl }} />
          <View>
            <AppText style={styles.nameText}>{item.name}</AppText>
            <AppText style={styles.phoneText}>{item.phone}</AppText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.usersLabel}>Total Users: {users.length}63</AppText>
      {renderHeader()}
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.profileId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: colors.white,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  usersLabel: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 10,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    marginRight: 8,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "500",
  },
  phoneText: {
    fontSize: 15,
    marginTop: 2,
    color: colors.medium,
  },
  searchContainer: {
    padding: 10,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: colors.medium,
    borderWidth: 0.2,
    marginBottom: 10,
  },
});
