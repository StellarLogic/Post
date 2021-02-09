import React, { useContext, useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    state: { auth },
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthorised ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
