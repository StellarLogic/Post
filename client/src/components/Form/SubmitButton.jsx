import React from "react";
import { useFormikContext } from "formik";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  submit: {
    padding: "10px",
  },
}));

const SubmitButton = ({ title, ...otherProps }) => {
  const classes = useStyles();
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      // disabled={isSubmitting}
      className={classes.submit}
      {...otherProps}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
