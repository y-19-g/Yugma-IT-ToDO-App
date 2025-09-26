# Todo App with Redux Thunks & API Integration

A modern Todo application built with React, Redux Toolkit, and Bootstrap. This app demonstrates how to integrate APIs with Redux using async thunks for all CRUD operations.

## Features

- ✅ **API Integration**: All operations (Create, Read, Update, Delete) use API calls
- 🔄 **Redux Thunks**: Async operations handled with Redux Toolkit's createAsyncThunk
- 🎨 **Modern UI**: Beautiful Bootstrap-based interface with loading states
- ⚡ **Loading States**: Visual feedback for all async operations
- 🚨 **Error Handling**: Comprehensive error handling with user-friendly messages
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices

## Tech Stack

- **React 19** - UI Framework
- **Redux Toolkit** - State Management with async thunks
- **React Bootstrap** - UI Components
- **JSON Server** - Mock API server
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the mock API server (in a separate terminal):
```bash
npm run server
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Operations

The app now performs all operations through API calls:

### Available Operations

- **Fetch Todos**: Loads todos from the API on app startup
- **Add Todo**: Creates a new todo via POST request
- **Update Todo**: Updates todo name via PUT request
- **Toggle Todo**: Updates completion status via PATCH request
- **Delete Todo**: Removes todo via DELETE request

### API Endpoints

The app uses a local JSON server running on `http://localhost:3001` with the following endpoints:

- `GET /todos` - Fetch all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `PATCH /todos/:id` - Partially update a todo
- `DELETE /todos/:id` - Delete a todo

## Redux State Structure

```javascript
{
  todos: {
    items: [],           // Array of todo items
    loading: false,      // Loading state for fetch operation
    error: null,         // Error message if any
    operationLoading: {  // Loading states for individual operations
      add: false,
      update: false,
      delete: false,
      toggle: false
    }
  }
}
```

## Key Features

### Loading States
- Global loading spinner when fetching todos
- Individual operation loading indicators
- Disabled buttons during operations
- Visual feedback for all async actions

### Error Handling
- Automatic error display with dismissible alerts
- Error auto-clear after 5 seconds
- Graceful fallback for failed operations

### User Experience
- Smooth animations and transitions
- Responsive design for all screen sizes
- Intuitive loading indicators
- Clear visual feedback for all actions

## Project Structure

```
src/
├── features/
│   ├── todo/
│   │   ├── TodoApp.jsx      # Main component
│   │   ├── TodoApp.css      # Styles
│   │   └── todoSlice.js     # Redux slice with async thunks
│   └── user/
│       └── userSlice.js     # User state management
├── services/
│   └── todoApi.js           # API service functions
└── store/
    └── store.js             # Redux store configuration
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run server` - Start mock API server
- `npm run lint` - Run ESLint

### Adding New Features

1. Add new API functions in `src/services/todoApi.js`
2. Create async thunks in `src/features/todo/todoSlice.js`
3. Update the UI component to use the new thunks
4. Add loading states and error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
