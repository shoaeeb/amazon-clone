import axios from "axios";
import API_URL from "../config";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${API_URL}/users/login`, { email, password }, config);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: error.response?.data?.msg || error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${API_URL}/users`, { name, email, password }, config);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: error.response?.data?.msg || error.message,
    });
  }
};