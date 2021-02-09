import React from "react";
import { Formik } from "formik";

const AppForm = ({ initialValues, onSubmit, validationSchema, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values }) => {
        return (
          <>
            <form onSubmit={handleSubmit}>{children}</form>
          </>
        );
      }}
    </Formik>
  );
};

export default AppForm;
