import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0d83da",
    },
    secondary: {
      main: "#3a4060",
    },
  },
  button: {
    padding: "10px",
  },
});

const AppThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
