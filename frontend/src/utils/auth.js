// src/utils/auth.js
export const setAuthToken = (token) => {
    sessionStorage.setItem("authToken", token);
  };
  
  export const getAuthToken = () => {
    return sessionStorage.getItem("authToken");
  };
  
  export const clearAuthToken = () => {
    sessionStorage.removeItem("authToken");
  };
  