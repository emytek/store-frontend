import axios from "axios";

const instance = axios.create({
    baseURL: "https://simple-product-store.fly.dev/",
});

export default instance;