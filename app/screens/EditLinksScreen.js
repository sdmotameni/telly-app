import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";

import colors from "../config/colors";
import userService from "../services/userService";
import handleAlert from "../utils/handleAlert";
import formatLinks from "../utils/formatLinks";

import InfoContext from "../misc/InfoContext";

import Screen from "../components/Screen";
import { AppForm, AppFormField, AppSubmitButton } from "../components/forms";
import AppText from "../components/AppText";

export default function EditLinksScreen({ route, navigation }) {
  const [initialValues, setInitialValues] = useState({});

  const { links } = useContext(InfoContext);

  const myLinks = route.params;

  useEffect(() => {
    const initialLinks = formatLinks(links, myLinks);
    setInitialValues(initialLinks);
  }, []);

  const handleSubmit = async (obj) => {
    Object.keys(obj).forEach((key) => {
      obj[key] = obj[key].trim();
      obj[key] = obj[key].replace("@", "");
      obj[key] = obj[key].replace("#", "");
      obj[key] = obj[key].replace("$", "");
    });

    const response = await userService.updateLinks(obj);
    if (!response.ok) return handleAlert(response.data);

    navigation.goBack(null);
  };

  return (
    <Screen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText style={styles.headerText}>Edit Social Links</AppText>
        <AppText style={styles.subHeaderText}>
          Please enter your usernames only. No urls.
        </AppText>
        {initialValues && (
          <AppForm
            initialValues={initialValues}
            validationSchema={null}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {Object.keys(links).map((key) => (
              <AppFormField
                key={key}
                name={key.toString()}
                imageUri={links[key].image}
                placeholder={links[key].title}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                textContentType="none"
              />
            ))}
            <AppSubmitButton style={styles.submitButton} title="Save Links" />
          </AppForm>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 15,
    flex: 1,
  },
  submitButton: {
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
