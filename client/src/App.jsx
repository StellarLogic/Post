import React, { useContext, useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import ToastBlock from "./components/Toast/ToastBlock";
import setAuthToken from "./utils/setAuthToken";
import CustomRoute from "./routes/CustomRoute";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

if (localStorage["x-auth-token"]) {
  setAuthToken(localStorage["x-auth-token"]);
}

const App = () => {
  const {
    state: { auth },
    loadUser,
  } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
      {/* {auth.isAuthorised && <Navbar />} */}
      <Navbar />
      <Switch>
        <CustomRoute />
        <Redirect to="/" />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
