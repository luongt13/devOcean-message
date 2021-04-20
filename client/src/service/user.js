import api from "./apiConfig.js"

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

export const findUser = async (body) => {
    try {
        const res = await api.post("/user", body)
        return res.data
    } catch (err) {
        throw err
    }
}

export const getUsers = async () => {
  const response = await api.get("/users")
  const users = response.data
  return users
}

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`)
  const user = response.data
  return user
}

export const updateUser = async (id) => {
  const response = await api.put(`/users/${id}`)
  const updatedUser = response.data
  return updatedUser
}