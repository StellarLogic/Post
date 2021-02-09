import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Home from "../containers/Home/Home";
import Login from "../containers/Auth/Login";
import SignUp from "../containers/Auth/SignUp";
import Details from "../containers/Details/Details";
import AddPost from "../containers/AddPost/AddPost";
import Profile from "../containers/Profile/Profile";
import CreateProfile from "../containers/Profile/CreateProfile";

const CustomRoute = () => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/post/:id" component={Details} />
      <PrivateRoute exact path="/post/add" component={AddPost} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/profile/edit" component={CreateProfile} />
    </>
  );
};

export default CustomRoute;
