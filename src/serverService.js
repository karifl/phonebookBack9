import axios from 'axios'
const serverURL = 'http://localhost:3001/persons'

const getAllData = () => {
    const request = axios.get(serverURL)
    return request.then(response => response.data)
}

const createData = newObject => {
    return axios.post(serverURL, newObject)

}

const updateData = (id, newObject) => {
    return axios.put(`${serverURL}/${id}`, newObject)
}

const deleteData = (id) => {
    
    return axios.delete(`${serverURL}/${id}`)
}

export default {
    getAllData: getAllData,
    createData: createData,
    updateData: updateData,
    deleteData: deleteData,
}