import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL || ""}`,
  withCredentials: true,
});
export default service;

function orders() {
  return service.get("/api/orders").then((response) => response.data);
}
export { orders };

function dailyOrders() {
  return service.get("/api/orders?date=today").then((response) => response.data); }
export { dailyOrders };

function createOrder(items) {
  return service.post("/api/orders", items).then((response) => response.data);
}
export { createOrder };

function getSingleOrder(orderId) {
  return service.get(`/api/orders/${orderId}`).then((response) => response.data);
}
export { getSingleOrder };