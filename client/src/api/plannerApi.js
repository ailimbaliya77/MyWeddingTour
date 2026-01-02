import API from "./axiosConfig";

// PLANNER SIGNUP
export const plannerSignup = (data) => API.post("/Planner Registration", data);

export const plannerLogin = (data) => API.post("/Login", data);
