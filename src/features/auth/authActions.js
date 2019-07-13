import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants";

export const login = creds => {
  return {
    type: LOGIN_USER,
    payload: {
      creds
    }
  };
};
export const logout = () => {
  return {
    SIGN_OUT_USER
  };
};
