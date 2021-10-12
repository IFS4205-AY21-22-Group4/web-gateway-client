import axios from "axios";

const gatewayAPI = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 5000,
});

export { gatewayAPI };
