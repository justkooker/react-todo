import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApiServices from 'services/todo-api-services';
import { getAllTodos } from './todoSlice';
export const todoRegister = createAsyncThunk(
  'register',
  async function (user, { rejectWithValue, dispatch }) {
    try {
      const response = await authApiServices.fetchRegister(user);
      if (response.status === 201) {
        dispatch(register(response.data));
        const { token } = response.data;
        dispatch(todoCurrentUser(token));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const todoLogin = createAsyncThunk(
  'login',
  async function (userCredentials, { rejectWithValue, dispatch }) {
    try {
      const response = await authApiServices.fetchLogin(userCredentials);

      if (response.status === 200) {
        dispatch(login(response.data));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const todoLogout = createAsyncThunk(
  'logout',
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await authApiServices.fetchLogout();
      if (response.status === 200) {
        dispatch(logout());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const todoCurrentUser = createAsyncThunk(
  'currentUser',
  async function (token, { rejectWithValue, dispatch }) {
    try {
      const response = await authApiServices.fetchCurrentUser(token);
      if (response.status === 200) {
        dispatch(loginViaToken(token));
        dispatch(getAllTodos());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    user: {},
    isAuth: false,
  },
  reducers: {
    register(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    login(state, action) {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuth = false;
      state.token = '';
      state.user = {};
    },
    loginViaToken(state) {
      state.isAuth = true;
    },
  },
});
export const { register, login, logout, loginViaToken } = authSlice.actions;
export default authSlice.reducer;
