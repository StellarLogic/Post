import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const ToastBlock = () => {
  const {
    state: { errors },
  } = useContext(AuthContext);

  return (
    errors !== null &&
    errors.length > 0 && (
      <>
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
        {/* {errors &&
          errors.map((error) =>
            toast.error(error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          )} */}
      </>
    )
  );
};

export default ToastBlock;
