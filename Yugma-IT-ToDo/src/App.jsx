import React from 'react';
import { useSelector } from 'react-redux';
import { WelcomeScreen } from './features/welcome/WelcomeScreen';
import { TodoApp } from './features/todo/TodoApp';
import './App.css'

function App() {
  const user = useSelector(state => state.user);

  return (
    <div className="app">
      {user.isLoggedIn ? <TodoApp /> : <WelcomeScreen />}
    </div>
  );
}

export default App;
