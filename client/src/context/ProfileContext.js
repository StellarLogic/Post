import React, { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import Axios from "../axios/axios";

export const ProfileContext = createContext();

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_Profile":
      return { ...state, profile: payload.profile, loading: payload.loading };
    default:
      return state;
  }
};

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    profile: null,
    loading: true,
  });

  const getProfile = () => {
    dispatch({
      type: "GET_Profile",
      payload: { profile: null, loading: true },
    });

    Axios.get("/profile")
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data.length <= 0) {
          return (
            toast.error(res.data.message),
            dispatch({
              type: "GET_Profile",
              payload: { profile: null, loading: false },
            })
          );
        }
        return dispatch({
          type: "GET_Profile",
          payload: { profile: res.data.data[0], loading: false },
        });
      })
      .catch((err) => {
        if (err) {
          return (
            dispatch({
              type: "GET_Profile",
              payload: { profile: null, loading: false },
            }),
            toast.error(err.response.data.message)
          );
        }
      });
  };

  const addProfile = (form) => {
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    Axios({
      method: !state.profile ? "POST" : "PUT",
      url: "/profile",
      data: formData,
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <ProfileContext.Provider value={{ state, getProfile, addProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
