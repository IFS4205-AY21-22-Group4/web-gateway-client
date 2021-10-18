import axios from "axios";

const gatewayAPI = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 5000,
});

const localAPI = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
});

export { gatewayAPI, localAPI };
