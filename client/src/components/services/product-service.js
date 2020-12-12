import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL || ""}`,
  withCredentials: true,
});
export default service;

function productById(productId) {
    return service.get(`/api/products/${productId}`).then((response) => response.data);
  }
  export { productById };

