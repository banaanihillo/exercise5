import axios from "axios"
const address = "/api/blogs"

let token = null
const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(address)
    const response = request.data
    return response
}

const createSomething = async (newObject) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.post(address, newObject, config)
    return response.data
}

const updateSomething = async (id, newObject) => {
    const request = await axios.put(`${address}/${id}`, newObject)
    const response = request.data
    return response
}

export default {
    getAll,
    createSomething,
    updateSomething,
    setToken
}

