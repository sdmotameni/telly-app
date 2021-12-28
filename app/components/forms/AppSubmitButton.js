import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

export default function AppSubmitButton({ title, ...rest }) {
  const { handleSubmit } = useFormikContext();
  return <AppButton title={title} onPress={handleSubmit} {...rest} />;
}

const styles = StyleSheet.create({});
