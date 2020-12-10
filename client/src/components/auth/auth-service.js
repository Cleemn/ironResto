import axios from 'axios';
 
const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true
});
export default service;

function signup(firstName, lastName, password, email, phone, type) {
  return service.post('/signup', {firstName, lastName, password, email, phone, type}).then(response => response.data)
}
export {signup}

function login(password, email) {
  return service.post('/login', {password, email}).then(response => response.data)
}
export {login}

function edit(firstName, lastName, email, password, phone) {
  return service.put('/edit', {firstName, lastName, email, password, phone}).then(response => response.data)
}
export {edit}

function logout() {
  return service.post('/logout', {}).then(response => response.data)
}
export {logout}

function loggedin() {
  return service.get('/loggedin').then(response => response.data)
}
export {loggedin}