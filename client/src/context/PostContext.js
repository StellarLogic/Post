import React, { createContext, useReducer } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../axios/axios";

export const PostContext = createContext();

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_POSTS":
      return { ...state, posts: payload };
    case "GET_SINGLE_POST":
      return { ...state, singlePost: payload };

    default:
      return state;
  }
};

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    singlePost: null,
  });

  const getPosts = () => {
    Axios.get("/posts")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: "GET_POSTS",
          payload: data.data,
        });
      });
  };

  const getSinglePost = (id) => {
    Axios.get(`/posts/${id}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: "GET_SINGLE_POST",
          payload: data.data,
        });
      });
  };

  const addPost = (value) => {
    const formData = new FormData();

    for (let keys in value) {
      formData.append(keys, value[keys]);
    }
    
    Axios.post(`/posts`, formData)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        data.message.map(({ value }) =>
          toast.success(value, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
      })
      .catch((error) => {
        const errors = error.response.data.message;
        return errors.map((err) =>
          toast.error(err.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
      });
  };

  //  dispatch({
  //    type: "GET_POST",
  //  });

  console.log("post", state);
  return (
    <PostContext.Provider value={{ state, getPosts, getSinglePost, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
