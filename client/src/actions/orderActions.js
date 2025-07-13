import axios from "axios";
import API_URL from "../config";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_CREATE_REQUEST" });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${API_URL}/orders`, order, config);
    dispatch({ type: "ORDER_CREATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload: error.response?.data?.msg || error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_DETAILS_REQUEST" });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${API_URL}/orders/${id}`, config);
    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload: error.response?.data?.msg || error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_PAY_REQUEST" });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`${API_URL}/orders/${orderId}/pay`, paymentResult, config);
    dispatch({ type: "ORDER_PAY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_PAY_FAIL",
      payload: error.response?.data?.msg || error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_LIST_MY_REQUEST" });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${API_URL}/orders/myorders`, config);
    dispatch({ type: "ORDER_LIST_MY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_LIST_MY_FAIL",
      payload: error.response?.data?.msg || error.message,
    });
  }
};