import axios from "axios";

const ENDPOINT = 'http://localhost:3001/api/persons'

export const getPersons = () => {
    return axios
        .get(ENDPOINT)
        .then(response => response.data)
}

export const postPerson = (person) => {
    return axios
        .post(ENDPOINT, person)
        .then(response => response.data)
}

export const deletePerson = (id) => {
    return axios
        .delete(`${ENDPOINT}/${id}`)
        .then(response => response.status)
}

export const updatePerson = (person, id) => {
    return axios
        .put(`${ENDPOINT}/${id}`, person)
        .then(response => response.data)
}
