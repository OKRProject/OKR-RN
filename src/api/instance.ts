import axios from 'axios';
import Config from 'react-native-config';

const baseURL = Config.API_URL;
const instance = axios.create({
  baseURL,
});

export default instance;
