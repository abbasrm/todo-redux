import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-c6618.firebaseio.com/',
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': true
    },
    crossdomain: true,
    origin: true
});

export default instance;