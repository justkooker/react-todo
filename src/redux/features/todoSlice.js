import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoApiServices from 'services/todo-api-services';
export const getAllTodos = createAsyncThunk(
  'getAllTodos',
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await todoApiServices.fetchGetAllTodos();
      if (response.status === 200) {
        dispatch(getTodos(response.data.data));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addTodoDb = createAsyncThunk(
  'AdTodoDb',
  async function (description, { rejectWithValue, dispatch }) {
    try {
      const response = await todoApiServices.fetchAddTodo(description);
      if (response.status === 200) {
        dispatch(addTodo(response.data.data));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteTodoFromDb = createAsyncThunk(
  'deleteTodoFromDb',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await todoApiServices.fetchDeleteTodo(id);
      if (response.status === 200) {
        dispatch(deleteTodo(id));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateTodo = createAsyncThunk(
  'updateTodo',
  async function (update, { rejectWithValue, dispatch }) {
    try {
      const response = await todoApiServices.fetchUpdateTodo(update);
      if (response.status === 200) {
        const { completed, _id } = response.data.data;
        dispatch(completedTodo({ _id, completed }));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editTodo = createAsyncThunk(
  'editTodo',
  async function (update, { rejectWithValue, dispatch }) {
    try {
      const response = await todoApiServices.fetchUpdateTodo(update);
      if (response.status === 200) {
        const { description, _id } = response.data.data;
        dispatch(saveTodoChangesToState({ description, _id }));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCompletedTodos = createAsyncThunk(
  'getCompletedTodos',
  async function (todosType, { rejectWithValue, dispatch }) {
    try {
      const response = await todoApiServices.fetchCompletedTodo(todosType);
      if (response.status === 200) {
        dispatch(saveCompletedTodosToState(response.data.data));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    todos: [],
    completedTodos: [],
    filter: '',
    editDescription: {},
    showTodoCreator: false,
    showTodoEditor: false,
    showCompletedTodos: false,
    completness: {
      completed: null,
      incompleted: null,
    },
    mobileView: true,
  },

  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    getTodos(state, action) {
      state.todos = action.payload;
    },
    toggleModalTodoCreator(state) {
      state.showTodoCreator = !state.showTodoCreator;
    },
    toggleModalTodoEditor(state) {
      state.showTodoEditor = !state.showTodoEditor;
    },
    completedTodo(state, action) {
      state.todos.find(todo => todo._id === action.payload._id).completed =
        action.payload.completed;
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(todo => todo._id !== action.payload);
    },
    filterTodo(state, action) {
      state.filter = action.payload;
    },
    todoEditorHandler(state, action) {
      state.editDescription = action.payload;
    },
    saveTodoChangesToState(state, action) {
      state.todos.find(todo => todo._id === action.payload._id).description =
        action.payload.description;
    },
    toggleCompletedTodos(state) {
      state.showCompletedTodos = !state.showCompletedTodos;
    },
    saveCompletedTodosToState(state, action) {
      state.completedTodos = action.payload;
    },
    completnessTodos(state, action) {
      state.completness = action.payload;
    },
    setMobileView(state,action){
      state.mobileView = action.payload
    }
  },
});
export const {
  addTodo,
  deleteTodo,
  toggleModalTodoEditor,
  toggleModalTodoCreator,
  completedTodo,
  filterTodo,
  getTodos,
  todoEditorHandler,
  saveTodoChangesToState,
  saveCompletedTodosToState,
  toggleCompletedTodos,
  completnessTodos,
  setMobileView
} = todoSlice.actions;
export default todoSlice.reducer;
