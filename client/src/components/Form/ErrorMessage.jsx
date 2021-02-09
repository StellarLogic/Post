import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    margin: theme.spacing(2, 0, 1),
  },
}));

const ErrorMessage = ({ error, visible, classsName = "" }) => {
  if (!visible || !error) return null;
  return (
    <Typography className={classsName} variant="subtitle1">
      {error}
    </Typography>
  );
};

export default ErrorMessage;
