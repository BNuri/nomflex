import axios from "axios";

const API_KEY = "fd7657e89b4fd10cf13e9d1de5cd15c1";
const LANGUAGE = "en-US";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

api.interceptors.request.use(config => {
  config.params = {
    api_key: API_KEY,
    language: LANGUAGE,
    ...config.params
  };
  return config;
});

export default api;
