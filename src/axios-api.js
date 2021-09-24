import axios from "axios";

const gatewayAPI = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
});

export { gatewayAPI };