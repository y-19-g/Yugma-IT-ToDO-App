import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { todoApi } from '../../services/todoApi';

// Async thunks for API operations
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const todos = await todoApi.getTodos();
      return todos;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async (name, { rejectWithValue }) => {
    try {
      const newTodo = await todoApi.addTodo(name);
      return newTodo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, newName }, { rejectWithValue }) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, { name: newName });
      return updatedTodo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodo',
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(id, completed);
      return updatedTodo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      await todoApi.deleteTodo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
    operationLoading: {
      add: false,
      update: false,
      delete: false,
      toggle: false
    }
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearTodos: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add todo
      .addCase(addTodoAsync.pending, (state) => {
        state.operationLoading.add = true;
        state.error = null;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.operationLoading.add = false;
        state.items.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.operationLoading.add = false;
        state.error = action.payload;
      })
      
      // Update todo
      .addCase(updateTodoAsync.pending, (state) => {
        state.operationLoading.update = true;
        state.error = null;
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.operationLoading.update = false;
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.operationLoading.update = false;
        state.error = action.payload;
      })
      
      // Toggle todo
      .addCase(toggleTodoAsync.pending, (state) => {
        state.operationLoading.toggle = true;
        state.error = null;
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        state.operationLoading.toggle = false;
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(toggleTodoAsync.rejected, (state, action) => {
        state.operationLoading.toggle = false;
        state.error = action.payload;
      })
      
      // Delete todo
      .addCase(deleteTodoAsync.pending, (state) => {
        state.operationLoading.delete = true;
        state.error = null;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.operationLoading.delete = false;
        state.items = state.items.filter(todo => todo.id !== action.payload);
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.operationLoading.delete = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;
