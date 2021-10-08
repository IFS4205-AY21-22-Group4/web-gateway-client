import axios from "axios";

const gatewayAPI = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 1000,
});

export { gatewayAPI };