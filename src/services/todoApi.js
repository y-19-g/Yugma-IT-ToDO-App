// src/services/todoApi.js
const API_BASE_URL = 'http://localhost:3001';

// Simulate API delay for better UX demonstration
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions - in a real app, these would be actual API calls
export const todoApi = {
  // Get all todos
  getTodos: async () => {
    await delay(500); // Simulate network delay
    const response = await fetch(`${API_BASE_URL}/todos?_limit=10`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const todos = await response.json();
    // Transform the API response to match our todo structure
    return todos.map(todo => ({
      id: todo.id,
      name: todo.title,
      completed: todo.completed,
      userId: todo.userId
    }));
  },

  // Add a new todo
  addTodo: async (name) => {
    await delay(300);
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: name,
        completed: false,
        userId: 1
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    
    const newTodo = await response.json();
    return {
      id: newTodo.id,
      name: newTodo.title,
      completed: newTodo.completed,
      userId: newTodo.userId
    };
  },

  // Update a todo
  updateTodo: async (id, updates) => {
    await delay(300);
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        title: updates.name,
        completed: updates.completed,
        userId: 1
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    
    const updatedTodo = await response.json();
    return {
      id: updatedTodo.id,
      name: updatedTodo.title,
      completed: updatedTodo.completed,
      userId: updatedTodo.userId
    };
  },

  // Toggle todo completion status
  toggleTodo: async (id, completed) => {
    await delay(300);
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: completed
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to toggle todo');
    }
    
    const updatedTodo = await response.json();
    return {
      id: updatedTodo.id,
      name: updatedTodo.title,
      completed: updatedTodo.completed,
      userId: updatedTodo.userId
    };
  },

  // Delete a todo
  deleteTodo: async (id) => {
    await delay(300);
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    
    return id;
  }
};
