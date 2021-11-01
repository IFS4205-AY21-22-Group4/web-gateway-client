import axios from "axios";

const gatewayAPI = axios.create({
    baseURL: "https://ifs4205-ay2122-g4-vm2.comp.nus.edu.sg",
    timeout: 5000,
});

const localAPI = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
});

export { gatewayAPI, localAPI };
