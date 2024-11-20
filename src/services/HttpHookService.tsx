import { useContext } from "react";
import AuthenticationContext from "@/context/AuthenticationContext";
import { HttpService } from "@/services/http.service";

export const HttpHookService = () => {
  const { loginState, setLoginState } = useContext(AuthenticationContext) as {
    loginState: boolean;
    setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
  };


// Authenticated GET request
const authGet = (url: string, headers?: Record<string, string>) =>
  HttpService(loginState, setLoginState, "AUTH", "GET", url, undefined, headers);

const authPost = (url: string, body?: unknown, headers?: Record<string, string>) =>
  HttpService(loginState, setLoginState, "AUTH", "POST", url, body, headers);

const authPut = (url: string, body: unknown, headers?: Record<string, string>) =>
  HttpService(loginState, setLoginState, "AUTH", "PUT", url, body, headers);

const authDel = (url: string, headers?: Record<string, string>) =>
  HttpService(loginState, setLoginState, "AUTH", "DELETE", url, undefined, headers);


// Unauthenticated GET request but credentials are required
// This is a special case where we need to include credentials but the user is not logged in
const sepcialPost = (url: string, body?: unknown, headers?: Record<string, string>) =>
  HttpService(false, setLoginState, "NO_AUTH", "POST", url, body, headers, true);



// Unauthenticated POST request
const get = (url: string, headers?: Record<string, string>) =>
  HttpService(false, setLoginState, "NO_AUTH", "GET", url, undefined, headers);

const post = (url: string, body?: unknown, headers?: Record<string, string>) =>
  HttpService(false, setLoginState, "NO_AUTH", "POST", url, body, headers);

const put = (url: string, body: unknown, headers?: Record<string, string>) =>
  HttpService(false, setLoginState, "NO_AUTH", "PUT", url, body, headers);

const del = (url: string, headers?: Record<string, string>) =>
  HttpService(false, setLoginState, "NO_AUTH", "DELETE", url, undefined, headers);



  return {
    authGet,
    authPost,
    authPut,
    authDel,
    sepcialPost,
    get,
    post,
    put,
    del,
  };
};
