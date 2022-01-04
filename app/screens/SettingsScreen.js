import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard } from "react-native";
import * as Yup from "yup";
import "yup-phone";

import colors from "../config/colors";
import useAuth from "../auth/useAuth";
import userService from "../services/userService";
import handleAlert from "../utils/handleAlert";
import handleNfc from "../utils/handleNfc";

import {
  AppForm,
  AppFormField,
  AppSubmitButton,
  AppErrorMessage,
} from "../components/forms";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import ImagePicker from "../components/ImagePicker";

export default function SettingsScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [photo, setPhoto] = useState(null);

  const auth = useAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadSettings();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSubmit = async (obj) => {
    setError(null);

    if (obj["website"]) {
      obj["website"] = obj["website"].replace("https://", "");
      obj["website"] = obj["website"].replace("http://", "");
    }

    const response = await userService.updateSettings(obj);
    if (!response.ok) return setError(response.data);

    handleAlert("Success", "Settings updated successfully");
    Keyboard.dismiss();
  };

  const handleImageChange = async (image) => {
    setError(null);

    if (image) {
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = image.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("image", { uri: localUri, name: filename, type });

      const response = await userService.uploadProfilePicture(
        formData,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      setPhoto(image.uri);

      if (response) setUploadProgress(null);

      if (!response.ok) return setError(response.data);
    }
  };

  const loadSettings = async () => {
    const response = await userService.getMe();
    if (!response.ok) return handleAlert("Something went wrong. Try again.");

    const { data } = response;
    setPhoto(data.photoUrl);
    setInitialValues({ name: data.name, bio: data.bio, website: data.website });
  };

  const handleTellyActivation = async () => {
    const response = await userService.getMe();
    if (!response.ok) alert("Something went wrong. Try again.");

    handleNfc(response.data.profileId, null);
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        <View style={styles.imageContainer}>
          <ImagePicker imageUri={photo} handleImageChange={handleImageChange} />

          {uploadProgress && (
            <AppText style={styles.uploadProgressText}>
              Uploading image: {uploadProgress}%
            </AppText>
          )}
        </View>
        <AppErrorMessage message={error} visible={error} />
        <AppText style={styles.label}>Name</AppText>
        <AppFormField
          name="name"
          icon="account"
          placeholder="Name"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          textContentType="name"
        />
        <AppText style={styles.label}>Bio</AppText>
        <AppFormField
          name="bio"
          icon="format-align-justify"
          placeholder="Bio"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
        />
        <AppText style={styles.label}>Website</AppText>
        <AppFormField
          name="website"
          icon="link"
          placeholder="Website URL"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
          autoCorrect={false}
        />
        <AppSubmitButton title="Save Changes" style={styles.submitButton} />
      </AppForm>
      <AppButton
        style={styles.activateButton}
        title="Activate Telly"
        onPress={handleTellyActivation}
      />
      <AppButton
        style={styles.logoutButton}
        title="Logout"
        onPress={auth.logout}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 15,
    flex: 1,
  },
  label: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: -8,
  },
  submitButton: {
    marginTop: 15,
  },
  logoutButton: {
    marginTop: 80,
    width: "100%",
    backgroundColor: colors.danger,
  },
  activateButton: {
    backgroundColor: "#50C878",
    marginTop: 15,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadProgressText: {
    marginLeft: 10,
  },
});

const validationSchema = Yup.object().shape({
  name: Yup.string().max(20).label("Name"),
  bio: Yup.string().max(20).label("Bio"),
});
