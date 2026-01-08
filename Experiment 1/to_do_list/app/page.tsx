'use client';

import { useState } from 'react';

export default function Page() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);

  const addTodo = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask('');
  };

  const toggleTodo = (index: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '320px',
          padding: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '6px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '16px', color: '#222' }}>
          To-Do List
        </h2>

        <div style={{ display: 'flex', marginBottom: '14px' }}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #999',
              borderRadius: '4px',
              color: '#000',
              backgroundColor: '#fff',
            }}
          />
          <button
            type="button"
            onClick={addTodo}
            style={{
              marginLeft: '8px',
              padding: '8px 14px',
              border: '1px solid #333',
              backgroundColor: '#eaeaea',
              color: '#000',
              cursor: 'pointer',
            }}
          >
            Add
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 0',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <span
                style={{
                  marginLeft: '8px',
                  color: todo.completed ? '#555' : '#111',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
