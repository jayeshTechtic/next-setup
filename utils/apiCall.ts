import { jwtDecode } from "jwt-decode";
import { Messages } from "./Messages";
import NotificationMessage from "./NotificationMessage";
import axios from "./axios.config";
import { constants } from "./helpers";
import Router from "next/router";

const validateJWT = () => {
  if (typeof window !== "undefined") {
    const fdlToken = window.localStorage.getItem(constants.localStorageToken);
    if (typeof fdlToken == "string") {
      const decodedToken: any = jwtDecode(fdlToken);
      let currentDate = new Date();
      // JWT exp is in seconds
      if (decodedToken?.exp * 1000 < currentDate.getTime()) {
        NotificationMessage("error", Messages.tokenExpired);
        window.localStorage.removeItem(constants.localStorageToken);
        Router.push("/");
        return false;
      } else {
        return true;
      }
    } else {
      NotificationMessage("error", Messages.tokenExpired);
      window.localStorage.removeItem(constants.localStorageToken);
      Router.push("/");
      return false;
    }
  }
};

const handleRequest = (withAuthToken: boolean | undefined, request: any) => {
  if (navigator.onLine) {
    if (withAuthToken) {
      if (validateJWT()) {
        return request();
      } else {
        return Promise.reject();
      }
    } else {
      return request();
    }
  } else {
    NotificationMessage("error", Messages.noInternet);
  }
};

const removeTokenFromHeader = (config: any) => ({
  ...config,
  headers: { ...config?.headers, Authorization: "" },
});

const getRequest = async (url: string, withAuthToken = true, config: any) => {
  if (withAuthToken)
    return await axios.get(`/${url}`, config).then((response) => response);
  return await axios
    .get(`/${url}`, removeTokenFromHeader(config))
    .then((response) => response);
};

const postRequest = async (
  url: string,
  payload: any,
  withAuthToken = true,
  config: any
) => {
  if (withAuthToken)
    return await axios
      .post(`/${url}`, payload, config)
      .then((response) => response);
  return await axios
    .post(`/${url}`, payload, removeTokenFromHeader(config))
    .then((response) => response);
};

const putRequest = async (
  url: string,
  payload: any,
  withAuthToken = true,
  config: any
) => {
  if (withAuthToken)
    return await axios
      .put(`/${url}`, payload, config)
      .then((response) => response);
  return await axios
    .put(`/${url}`, payload, removeTokenFromHeader(config))
    .then((response) => response);
};

const patchRequest = async (
  url: string,
  payload: any,
  withAuthToken = true,
  config: any
) => {
  if (withAuthToken)
    return await axios
      .patch(`/${url}`, payload, config)
      .then((response) => response);
  return await axios
    .patch(`/${url}`, payload, removeTokenFromHeader(config))
    .then((response) => response);
};

const deleteRequest = async (
  url: string,
  withAuthToken = true,
  config: any
) => {
  if (withAuthToken)
    return await axios.delete(`/${url}`, config).then((response) => response);
  return await axios
    .delete(`/${url}`, removeTokenFromHeader(config))
    .then((response) => response);
};

const apiCall = {
  get: (url: string, withAuthToken?: boolean, config?: any) =>
    handleRequest(withAuthToken, () => getRequest(url, withAuthToken, config)),
  post: (url: string, payload?: any, withAuthToken?: boolean, config?: any) =>
    handleRequest(withAuthToken, () =>
      postRequest(url, payload, withAuthToken, config)
    ),
  put: (url: string, payload: any, withAuthToken?: boolean, config?: any) =>
    handleRequest(withAuthToken, () =>
      putRequest(url, payload, withAuthToken, config)
    ),
  patch: (url: string, payload: any, withAuthToken?: boolean, config?: any) =>
    handleRequest(withAuthToken, () =>
      patchRequest(url, payload, withAuthToken, config)
    ),
  delete: (url: string, withAuthToken?: boolean, config?: any) =>
    handleRequest(withAuthToken, () =>
      deleteRequest(url, withAuthToken, config)
    ),
};

export default apiCall;
