import axios from "axios";

const eventApiInstance = axios.create({
  baseURL: "http://localhost:4040/eventapi",
});

const setBearerToken = (token) => {
  eventApiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(`Set bearer token, ${token}`);
};

const reachApi = (query) => eventApiInstance.post("/", { query });

export { reachApi, setBearerToken };
