import axios from 'axios';
axios.defaults.baseURL = 'https://api-nodejs-todolist.herokuapp.com/';
const token = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};
const fetchRegister = async user => {
  const response = await axios.post('user/register', user);
  if (response.status === 201) {
    token.set(response.data.token);

    return response;
  }
  return;
};
const fetchLogin = async userCredentials => {
  const response = await axios.post('user/login', userCredentials);
  if (response.status === 200) {
    token.set(response.data.token);
    return response;
  }
  return;
};
const fetchLogout = async () => {
  const response = await axios.post('user/logout');
  if (response.status === 200) {
    token.unset();
    return response;
  }
  return;
};
const fetchCurrentUser = async tokenFromState => {
  token.set(tokenFromState);
  const response = await axios.get('user/me');
  if (response.status === 200) {
    return response;
  }
  return;
};
const fetchGetAllTodos = async () => {
  const response = await axios.get('task');
  if (response.status === 200) {
    return response;
  }
  return;
};
const fetchAddTodo = async description => {
  const response = await axios.post('task', description);
  if (response.status === 201) {
    return response;
  }
  return;
};
const fetchDeleteTodo = async id => {
  const response = await axios.delete(`task/${id}`);
  if (response.status === 200) {
    return response;
  }
  return;
};
const fetchUpdateTodo = async update => {
  const { _id, toUpdate } = update;
  const response = await axios.put(`task/${_id}`, toUpdate);
  if (response.status === 200) {
    return response;
  }
  return;
};
const fetchCompletedTodo = async (type) => {
  const response = await axios.get(`task?completed=${type}`);
  if (response.status === 200) {
    return response;
  }
  return;
};
export default {
  fetchRegister,
  fetchLogin,
  fetchLogout,
  fetchCurrentUser,
  fetchGetAllTodos,
  fetchAddTodo,
  fetchDeleteTodo,
  fetchUpdateTodo,
  fetchCompletedTodo
};
