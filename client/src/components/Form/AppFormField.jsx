import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    fontSize: "12px",
    margin: "0",
  },
}));

const AppFormField = ({ name, type = "text", ...otherProps }) => {
  const classes = useStyles();
  const { touched, handleChange, setFieldTouched, errors } = useFormikContext();

  return (
    <>
      <TextField
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        type={type}
        className={classes.input}
        {...otherProps}
      />
      <ErrorMessage
        classsName={classes.error}
        visible={touched[name]}
        error={errors[name]}
      />
    </>
  );
};

export default AppFormField;
