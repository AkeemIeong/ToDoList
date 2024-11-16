import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);


  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        { text: input.trim(), completed: false }
      ]);
      setInput(''); 
    }
  };

  const toggleCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  
  const deleteCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
  };

  const deleteAll = () => {
    setTodos([]);
  };

  return (
    <div className="container">
      <h1>Lista de Quehaceres</h1>
      
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Añadir nuevo quehacer"
      />
      <button onClick={addTodo}>Agregar</button>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(index)}
            />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>

      <button onClick={deleteAll}>Eliminar todos</button>
      <button onClick={deleteCompleted}>Eliminar completados</button>
    </div>
  );
}

export default App;
