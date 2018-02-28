import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://klokov-20216.firebaseio.com/'
})

export default instance;