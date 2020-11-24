import axios from 'axios';
 
const service = axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true
});
export default service;

function signup(username, passwordHash, email, phone, type) {
  return service.post('/signup', {username, passwordHash, email, phone, type}).then(response => response.data)
}
export {signup}

function login(username, passwordHash, email) {
  return service.post('/login', {username, passwordHash, email}).then(response => response.data)
}
export {login}

function edit(username, email, passwordHash, phone) {
  return service.post('/edit', {username, email, passwordHash, phone}).then(response => response.data)
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