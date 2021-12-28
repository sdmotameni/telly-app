import React from "react";
import { Formik } from "formik"; // named export, not a default export

export default function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  enableReinitialize,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
    >
      {() => <>{children}</>}
    </Formik>
  );
}
