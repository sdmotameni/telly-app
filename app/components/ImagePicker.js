import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import handleAlert from "../utils/handleAlert";

export default function ProfileImagePicker({ imageUri, handleImageChange }) {
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      handleAlert("You need to enable permission to access the library.");
  };

  const handlePress = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.cancelled) handleImageChange(result);
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.medium}
            name="camera"
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    width: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
