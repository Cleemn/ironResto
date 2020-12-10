import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
export default service;

function orders() {
  return service.get("/orders").then((response) => response.data);
}
export { orders };

function dailyOrders() {
  return service.get("/orders?date=today").then((response) => response.data); }
export { dailyOrders };

function createOrder(items) {
  return service.post("/orders", items).then((response) => response.data);
}
export { createOrder };

function getSingleOrder(orderId) {
  return service.get(`/orders/${orderId}`).then((response) => response.data);
}
export { getSingleOrder };