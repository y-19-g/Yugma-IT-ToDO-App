import { createSlice } from '@reduxjs/toolkit'

let nextId = 1;

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: nextId++,
        name: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter(t => t.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, newName } = action.payload;
      const todo = state.find(t => t.id === id);
      if (todo) {
        todo.name = newName;
      }
    },

  }
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
