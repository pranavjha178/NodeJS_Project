import axios from 'axios'

//export const BASE_URL = 'http://localhost:5041/';
export const BASE_URL = 'http://localhost:8080/';

export const ENDPOINTS = {
    participant: 'participant',
    question:'question',
    getAnswers : 'question/getanswers',
    sendEmail: 'sendmail/gmail'
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
    }
}

export default axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      "Content-type": "application/json"
    }
  });