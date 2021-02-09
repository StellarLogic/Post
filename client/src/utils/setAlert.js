import { v4 as uuidv4 } from "uuid";

export const setAlert = (type, msg, alertType, timeout = 3000) => (
  dispatch
) => {
  const id = uuidv4();
  dispatch({ type, payload: { msg, alertType, id } });

  setTimeout(() => {
    dispatch({ type, payload: id });
  }, timeout);
};
