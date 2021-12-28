import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

export default function AppFormField({ name, ...rest }) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();

  return (
    <>
      <AppTextInput
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        {...rest}
      />
      {errors[name] && touched[name] && (
        <AppErrorMessage message={errors[name]} visible={touched[name]} />
      )}
    </>
  );
}
