import React from "react";
import AuthProvider from "./AuthContext";
import PostProvider from "./PostContext";
import AppThemeProvider from "../Theme/AppThemeProvider";
import ProfileProvider from "./ProfileContext";

const AllContextProvider = ({ children }) => {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <PostProvider>{children}</PostProvider>
        </ProfileProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
};

export default AllContextProvider;
