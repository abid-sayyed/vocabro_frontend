/** @format */

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Unified HttpService function
export const HttpService = async (
  loginState: boolean,
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>,
  requiresAuth: "AUTH" | "NO_AUTH" = "NO_AUTH",
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body?: unknown,
  headers: Record<string, string> = {},
  special?: boolean
) => {

  const isAuthRequired = requiresAuth === "AUTH";

  // If authentication is required and the user is not logged in, return an error
  if (isAuthRequired && !loginState) {
    return {
      status: 401,
      message: "You need to login to access this resource",
    };
  }

    

  // Set the default headers
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Create the options for the fetch request
  const options: RequestInit = {
    method,
    headers: defaultHeaders,
    body: body ? JSON.stringify(body) : undefined,
  };

  // Include credentials only if authentication is required and the user is logged in
  if (isAuthRequired && loginState) {
    options.credentials = "include";
  }

  //Inclue credential ony if for spcial requests
  if(special){
    options.credentials = "include";
  }

  try {
    const URL = `${BASE_URL}/api${url}`;
    const response = await fetch(URL, options);

    // Handle unauthorized responses (e.g., token expiration)
    if (response.status === 401 && isAuthRequired) {
      // Logic for handling token expiration, refresh, or redirect
      throw new Error("Unauthorized");
    }

    // Check for any non-OK response status
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
};

// export const authGet = (url: string, headers?: Record<string, string>) =>
//   HttpService("AUTH", "GET", url, undefined, headers);

// export const authPost = (
//   url: string,
//   body: unknown,
//   headers?: Record<string, string>
// ) => HttpService("AUTH", "POST", url, body, headers);

// export const authPut = (
//   url: string,
//   body: unknown,
//   headers?: Record<string, string>
// ) => HttpService("AUTH", "PUT", url, body, headers);

// export const authDel = (url: string, headers?: Record<string, string>) =>
//   HttpService("AUTH", "DELETE", url, undefined, headers);

// //unauthenticated requests
// export const get = (url: string, headers?: Record<string, string>) =>
//   HttpService("NO_AUTH", "GET", url, undefined, headers);

// export const post = (
//   url: string,
//   body: unknown,
//   headers?: Record<string, string>
// ) => HttpService("NO_AUTH", "POST", url, body, headers);

// export const put = (
//   url: string,
//   body: unknown,
//   headers?: Record<string, string>
// ) => HttpService("NO_AUTH", "PUT", url, body, headers);

// export const del = (url: string, headers?: Record<string, string>) =>
//   HttpService("NO_AUTH", "DELETE", url, undefined, headers);
