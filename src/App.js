import React, { useState } from 'react';

// components
import logo from './logo.svg';

// styles
import './App.css';

// hooks
import { useDispatch, useSelector } from 'react-redux/es/exports';

const Todos = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleDelete = id => dispatch({
    type: 'DELETE_TODO',
    payload: id,
  });

  if (!todos || !todos.length) {
    return <p>NO TODOS</p>
  } return(
    <ul>
      {todos.map(todo => 
        <li key={todo.id} onClick={() => handleDelete(todo.id)}>
          {todo.title}
        </li>
      )}
    </ul>
  )
};

const TodoInput = () => {
  const dispatch = useDispatch();
  const [ newTodo, setNewTodo ] = useState('');

  const handleChange = e => {
    setNewTodo(e.target.value);
  };

  const handleClick = () => dispatch({
    type: 'ADD_TODO',
    payload: {
      title: newTodo,
      id: Date.now(),
    },
  }, setNewTodo(''));

  return(
    <>
      <input
        value={newTodo}
        onChange={handleChange}
        type='text'
      ></input>
      <button
        onClick={handleClick}
      >AddTodo</button>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>SUPER SIMPLE REDUX TODO</p>
        <Todos />
        <TodoInput />
      </header>
    </div>
  );
}

export default App;
