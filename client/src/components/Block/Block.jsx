import React from "react";
import { styled } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useWindowSize from "../../utils/useWindowSize";

const useStyles = makeStyles((theme, ...other) => {
  // console.log("other :>> ", other);
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      boxShadow: "none",
      background: theme.palette.primary.main,
    },
    block: {
      background: theme.palette.common.white,
    },
    box: {
      padding: ({ width }) => {
        return width >= 600 ? theme.spacing(5) : theme.spacing(2);
      },
      borderRadius: "7px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    },
  };
});

const Block = ({ children, ...otherProps }) => {
  const { width, height } = useWindowSize();
  const classes = useStyles({ width });
  return (
    <Grid className={classes.container}>
      <Grid item className={classes.block} {...otherProps}>
        <div className={classes.box}>{children}</div>
      </Grid>
    </Grid>
  );
};

export default Block;
