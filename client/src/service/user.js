import axios from "axios";
import api from "./apiConfig.js"
const apiURL = "http://localhost:4567/api"

export const signUp = async (credentials) => {
    try {
        const res = await api.post("/sign-up", credentials);
        localStorage.setItem("token", res.data.token);
    } catch (err) {
        throw err;
    }
}

export const signIn = async (credentials) => {
    try {
        const res = await api.post("/sign-in", credentials);
        localStorage.setItem("token", res.data.token);
        return res.data;
    } catch (err) {
        throw err;
    }
}  

export const verifyUser = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
        const res = await api.get("/verify");
        return res.data;
    } else {
        return false;
    }
}

export const getUsers = async () => {
  const response = await axios.get(`${apiURL}/users`)
  const users = response.data
  return users
}

export const getUser = async (id) => {
  const response = await axios.get(`${apiURL}/users/${id}`)
  const user = response.data
  return user
}

//edit user
export const updateUser = async (id) => {
  const response = await axios.put(`${apiURL}/users/${id}`)
  const updatedUser = response.data
  return updatedUser
}