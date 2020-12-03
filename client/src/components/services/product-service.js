import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
export default service;

function productById(productId) {
    return service.get(`/products/${productId}`).then((response) => response.data);
  }
  export { productById };

