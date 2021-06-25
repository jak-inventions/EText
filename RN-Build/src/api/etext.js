import axios from 'axios';

export default axios.create({
    baseURL: 'https://etext-api.herokuapp.com'
});