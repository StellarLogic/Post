import React, { useContext } from "react";
import * as Yup from "yup";
import AppFormField from "../../components/Form/AppFormField";
import SubmitButton from "../../components/Form/SubmitButton";
import AppForm from "../../components/Form/AppForm";
import Grid from "@material-ui/core/Grid";
import Block from "../../components/Block/Block";
import { Redirect, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/AuthContext";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
  confirmPassword: Yup.string()
    .required()
    .label("Confirm Password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
});

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.button.padding,
  },
}));

const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();
  const {
    state: { auth },
    register,
  } = useContext(AuthContext);

  if (auth.isAuthorised) {
    return <Redirect to="/" />;
  }

  return (
    <Block lg={6} md={8} sm={10} xs={11}>
      <AppForm
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async ({ name, email, password }) =>
          register({ name, email, password })
        }
        validationSchema={validationSchema}
      >
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} xs={12}>
            <AppFormField
              name="name"
              label="Email First Name"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <AppFormField
              name="email"
              label="Email Address"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <AppFormField
              name="password"
              label="Enter Password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <AppFormField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Button
              onClick={() => history.push("/login")}
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
            >
              Login
            </Button>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <SubmitButton title="SignUp" fullWidth />
          </Grid>
        </Grid>
      </AppForm>
    </Block>
  );
};

export default SignUp;
