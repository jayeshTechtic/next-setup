import axios from "axios";
import { Messages } from "./Messages";
import NotificationMessage from "./NotificationMessage";
import { constants } from "./helpers";
import Router from "next/router";

const instance = axios.create({
  baseURL: process.env.API_URL,
  // baseURL: "http://45.33.59.74/feel-d-love-dev/api/", // testing url
  // baseURL: "https://api.feeldlove.com/api/", // client's live server url
});

if (typeof window !== "undefined") {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${window.localStorage.getItem(constants.localStorageToken)}`;
}

const setHeader = (token: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(constants.localStorageToken, token);
  }
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.response.use(
  (response: any) => {
    const status = response && response?.status;
    if (status === 200) {
      if (response?.data?.token) {
        setHeader(response?.data?.token);
      }
      return response?.data;
    }
  },
  (error: any) => {
    const message = error?.response?.data?.message;
    const somethingwentwrong = Messages.somethingwentwrong;
    if (error?.response?.status === 400) {
      NotificationMessage("error", message || somethingwentwrong);
    } else if (error?.response?.status === 500) {
      NotificationMessage("error", somethingwentwrong);
    } else if (error?.response?.status === 401) {
      // NotificationMessage("error", message || (Messages.tokenExpired));
      window.localStorage.removeItem(constants.localStorageToken);
      Router.push("/login");
    } else {
      NotificationMessage("error", message || somethingwentwrong);
    }
    return Promise.reject();
  }
);

// All requests will wait 5 seconds before timeout
// instance.defaults.timeout = 5000;
instance.defaults.timeout = 20000;

export default instance;
