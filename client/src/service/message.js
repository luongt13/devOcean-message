import api from "./apiConfig"

//get all conversations
export const getConversations = async (id) => {
    try {
        const res = await api.get(`/conversations/${id}`)
        return res.data
    } catch (err) {
        throw err
    }
}
//get messages for a user thread
export const getMessages = async (id) => {
    try {
        let res = await api.get(`/messages/${id}`)
        return res.data

    } catch (err) {
        throw err
    }
}

//create message
export const createMessage = async (body) => {
    try {
        let res = await api.post("/create", body)
        return res.data
    }  catch (err) {
        throw err
    }
}
//delete message