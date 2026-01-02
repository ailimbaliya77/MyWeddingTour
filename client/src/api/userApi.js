import API from "./axiosConfig";

// USER SIGNUP
export const userSignup = (data) => API.post("/User Registration", data);

// USER LOGIN
export const userLogin = (data) => API.post("/Login", data);
