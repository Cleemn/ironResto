import axios from 'axios';
 
const service = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL || ""}`,
  withCredentials: true
});
export default service;

function signup(firstName, lastName, password, email, phone, photo, type) {
  return service.post('/api/signup', {firstName, lastName, password, email, phone, photo, type}).then(response => response.data)
}
export {signup}

function login(password, email) {
  return service.post('/api/login', {password, email}).then(response => response.data)
}
export {login}

function handleUpload(photo) {
  return service.post('/api/upload', photo).then((response) => response.data);
}
export { handleUpload };

function edit(firstName, lastName, email, password, phone, photo) {
  return service.put('/api/edit', {firstName, lastName, email, password, phone, photo}).then(response => response.data)
}
export {edit}

function logout() {
  return service.post('/api/logout', {}).then(response => response.data)
}
export {logout}

function loggedin() {
  return service.get('/api/loggedin').then(response => response.data)
}
export {loggedin}