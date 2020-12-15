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

function createProduct(name, price, description, type, portion, calories, photo) {
  return service.post("/api/products", { name, price, description, type, portion, calories, photo }).then((response) => response.data);
}
export { createProduct };

function handleUpload(photo) {
  return service.post('/api/upload', photo).then((response) => response.data);
}
export { handleUpload };

function deleteProduct(productId) {
  return service.delete(`/api/products/${productId}`).then((response) => response.data);
}
export { deleteProduct };