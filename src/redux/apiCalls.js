import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { puplicRequest } from "../requesMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await puplicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return { success: true };
  } catch (err) {
    const errorMessage = err.response?.data || "Authentication failed";
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

export const register = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await puplicRequest.post("/auth/register", user);
    dispatch(loginSuccess(res.data));
    // window.location.replace("/login");
    return { success: true };
  } catch (err) {
    const errorMessage = err.response?.data.message || "Registration failed";
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};
