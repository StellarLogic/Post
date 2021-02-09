import React, { createContext, useReducer, useMemo } from "react";
import { toast } from "react-toastify";
import Axios from "../axios/axios";
import { setAlert } from "../utils/setAlert";
export const AuthContext = createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "REGISTER":
      window.localStorage.setItem("x-auth-token", payload.token);
      return { ...state, auth: { ...state.auth, ...payload } };
    case "SIGN_IN":
      window.localStorage.setItem("x-auth-token", payload.token);
      return { ...state, auth: { ...state.auth, ...payload } };
    case "SIGN_OUT":
      window.localStorage.removeItem("x-auth-token");
      return {
        ...state,
        auth: { isAuthorised: false, token: null, user: null },
      };
    case "LOAD_USER":
      return { ...state, auth: { ...state.auth, ...payload } };
    default:
      break;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    auth: { isAuthorised: false, token: null, user: null },
  });

  const loadUser = async () => {
    if (localStorage["x-auth-token"]) {
      Axios.get("/users/me")
        .then((res) => {
          return res.data.data;
        })
        .then((data) => {
          return dispatch({
            type: "LOAD_USER",
            payload: {
              isAuthorised: true,
              token: localStorage["x-auth-token"],
              user: data,
            },
          });
        });
    }
  };

  const register = async (value) => {
    Axios.post("/users", value)
      .then((res) => {
        const { user, message, token } = res.data;
        return (
          dispatch({
            type: "REGISTER",
            payload: {
              isAuthorised: true,
              token: token,
              user: user,
            },
          }),
          message.map(({ value }) =>
            toast.success(value, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          )
        );
      })
      .catch((error) => {
        if (error.response) {
          const errors = error.response.data.message;

          return (
            errors.map((err) =>
              toast.error(err.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
            ),
            dispatch({
              type: "SIGN_OUT",
            })
          );
        }
      });
  };

  const signIn = async (value) => {
    Axios.post("/auth", value)
      .then((res) => {
        return res.data.data;
      })
      .then((data) => {
        const { token, user } = data;
        return dispatch({
          type: "SIGN_IN",
          payload: {
            isAuthorised: true,
            token: token,
            user: user,
          },
        });
      });
    // .catch((error) => {
    //   if (error.response) {
    //     return (
    //       dispatch({
    //         type: "SIGN_OUT",
    //       }),
    //       setAlert("ERRORS", error.response.data.message, error)
    //     );
    //   }
    // });
  };

  const signOut = () =>
    dispatch({
      type: "SIGN_OUT",
    });

  console.log("context", state);

  return (
    <AuthContext.Provider
      value={{ state, loadUser, signIn, signOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
