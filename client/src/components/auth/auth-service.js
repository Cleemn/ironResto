import axios from 'axios';
 
const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true
});
export default service;

function signup(username, password, email, phone, type) {
  return service.post('/signup', {username, password, email, phone, type}).then(response => response.data)
}
export {signup}

function login(username, password, email) {
  return service.post('/login', {username, password, email}).then(response => response.data)
}
export {login}

function edit(username, email, password, phone) {
  return service.put('/edit', {username, email, password, phone}).then(response => response.data)
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