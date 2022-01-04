import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";

import colors from "../config/colors";
import userService from "../services/userService";
import handleAlert from "../utils/handleAlert";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import TopBar from "../components/TopBar";
import WebsiteBar from "../components/WebsiteBar";
import Links from "../components/Links";
import AppText from "../components/AppText";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [myLinks, setMyLinks] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadUser();
    });
    return unsubscribe;
  }, [navigation]);

  const loadUser = async () => {
    const response = await userService.getMe();
    if (!response.ok) return handleAlert("Something went wrong. Try again.");

    const { data } = response;
    const userDetails = (({ name, bio, photoUrl, website }) => ({
      name,
      bio,
      photoUrl,
      website,
    }))(data);

    setUser(userDetails);
    setMyLinks(data.links);
  };

  const biolerplateUser = {
    image:
      "https://res.cloudinary.com/dyusynvjw/image/upload/v1618083102/avatar.png",
    name: "Your Name",
    bio: "Your Bio",
    website: "example.com",
  };

  return (
    <Screen style={styles.container}>
      {user && Object.keys(user).length === 0 ? (
        <TopBar content={biolerplateUser} />
      ) : (
        <TopBar content={user} />
      )}
      <AppButton
        title="Edit Links"
        onPress={() => navigation.push("EditLinks", myLinks)}
        style={styles.editLinksBtn}
      />
      {user.website && <WebsiteBar website={user.website} />}
      {!myLinks && (
        <AppText style={styles.noLinksText}>
          Once you add some links to your profile, they will appear here.
        </AppText>
      )}
      {myLinks && Object.keys(myLinks).length === 0 ? (
        <AppText style={styles.noLinksText}>
          Once you add some links to your profile, they will appear here.
        </AppText>
      ) : (
        <Links content={myLinks} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    paddingHorizontal: 8,
    paddingTop: 8,
    flex: 1,
  },
  editLinksBtn: {
    marginBottom: 10,
  },
  noLinksText: {
    marginTop: 10,
    color: "#21538d",
    textAlign: "center",
  },
});
