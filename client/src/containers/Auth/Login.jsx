import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import AppFormField from "../../components/Form/AppFormField";
import SubmitButton from "../../components/Form/SubmitButton";
import AppForm from "../../components/Form/AppForm";
import Grid from "@material-ui/core/Grid";
import Block from "../../components/Block/Block";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/AuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.button.padding,
  },
}));

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const { state: authState, signIn, signOut } = useContext(AuthContext);

  const handleSubmit = (value) => {
    signIn(value);
  };

  useEffect(() => {
    if (authState.auth.isAuthorised) {
      return history.push("/");
    }
  }, [authState.auth.isAuthorised]);

  return (
    <Block lg={4} md={6} sm={8} xs={11}>
      <AppForm
        initialValues={{ email: "asd@gmail.com", password: "123" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} xs={12}>
            <AppFormField
              name="email"
              label="Email Address"
              fullWidth
              variant="outlined"
              defaultValue="asd@gmail.com"
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <AppFormField
              name="password"
              label="Enter Password"
              type="password"
              fullWidth
              variant="outlined"
              defaultValue="123"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Button
              onClick={() => history.push("/signup")}
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <SubmitButton fullWidth title="Login" />
          </Grid>
        </Grid>
      </AppForm>
    </Block>
  );
};

export default Login;
